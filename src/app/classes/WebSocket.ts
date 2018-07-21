import * as WS from "websocket";
import logger from "../../lib/logger";
import {Connection} from "./Connection";

export class WebSocket {
    constructor(server: WS.server) {
        server.on("request", (request: WS.request) => {
            this.onRequest(request);
        });
    }

    protected onRequest(request: WS.request) {
        const connection = request.accept();
        this.onConnection(connection);
    }

    protected onConnection(connection: WS.connection) {
        const con = new Connection(connection);
        connection.on("close", () => {
            this.connectionClose(con);
        });
        logger.info("New connection", con.toString());
    }

    protected connectionClose(connection: Connection) {
        connection.close();
    }
}
