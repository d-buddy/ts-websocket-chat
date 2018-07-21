import {server} from "websocket";
import {WebSocket} from "./app/classes/WebSocket";
import logger from "./lib/logger";
import httpServer from "./server";

const wsServer = new server({
    httpServer,
});

logger.info("Starting WS server");

const webSocketServer = new WebSocket(wsServer);

export default webSocketServer;
