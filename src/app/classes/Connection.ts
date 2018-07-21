import * as WS from "websocket";
import logger from "../../lib/logger";
import {ConnectionStore} from "../models/ConnectionStore";

export class Connection {
    private connection: WS.connection;
    private store: ConnectionStore;
    private registered: boolean = false;
    private name: string = "";

    constructor(connection: WS.connection) {
        this.connection = connection;
        this.store = ConnectionStore.getInstance();
        connection.on("message", (message: WS.IMessage) => {
            this.onMessage(message);
        });
    }

    public toString() {
        return this.name;
    }

    public sendError(message: any, type: string) {
        this.connection.sendUTF(JSON.stringify({message, status: 400, type}));
    }

    public close() {
        logger.info("closing connection", this.name);
        if (this.registered) {
            this.store.delete(this.name);
        }
    }

    public send(message: any, type: string) {
        this.connection.sendUTF(JSON.stringify({message, status: 200, type}));
    }

    protected onMessage(message: WS.IMessage) {
        if (message.type === "utf8" && message.utf8Data) {
            logger.info("New message", "from", this.name);
            const request = JSON.parse(message.utf8Data);
            switch (request.type) {
                case "register":
                    this.register(request);
                    break;
                case "add":
                    this.addContact(request);
                    break;
                case "send":
                    this.sendMessage(request);
                    break;
                default:
                    this.sendError("Undefined method", "method");
            }
        }
    }

    protected addContact(request: any) {
        if (!this.registered) {
            this.sendError("Not registered", "add");
            return;
        }
        if (this.store.has(request.name)) {
            this.send(request.name, "add");
        } else {
            this.sendError("user not found", "add");
        }
    }

    protected sendMessage(request: any) {
        const {name, message} = request;
        if (this.name === name) {
            return;
        }
        if (!this.store.has(name)) {
            this.sendError("user not exist", "send");
        } else {
            const connection = this.store.get(name);
            if (connection) {
                connection.send({name: this.name, message: message ? message : ""}, "send");
            }
        }
    }

    protected register(request: any) {
        if (this.registered) {
            this.sendError("already registered", "register");
        } else {
            try {
                if (!request.name || request.name.length === 0) {
                    this.sendError("Invalid user name", "register");
                    return;
                }
                this.store.add(request.name, this);
                this.registered = true;
                this.name = request.name;
                logger.info("registered user", this.name);
                this.send("successful", "register");
            } catch (e) {
                this.sendError(e.message, "register");
            }
        }
    }

}
