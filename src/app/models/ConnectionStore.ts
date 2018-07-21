import {Connection} from "../classes/Connection";

export class ConnectionStore {

    public static getInstance() {
        if (ConnectionStore.instance === null) {
            ConnectionStore.instance = new ConnectionStore();
        }
        return ConnectionStore.instance;
    }

    private static instance: ConnectionStore | null = null;
    private list: Map<string, Connection>;

    private constructor() {
        this.list = new Map<string, Connection>();
    }

    public add(name: string, con: Connection) {
        if (this.list.has(name)) {
            throw new Error("username already exist");
        }
        this.list.set(name, con);
    }

    public delete(name: string) {
        if (!this.list.has(name)) {
            throw new Error("username not exist");
        }
        this.list.delete(name);
    }

    public has(name: string): boolean {
        return this.list.has(name);
    }

    public get(name: string): Connection | undefined {
        if (!this.list.has(name)) {
            throw new Error("user not exists");
        }
        return this.list.get(name);
    }
}
