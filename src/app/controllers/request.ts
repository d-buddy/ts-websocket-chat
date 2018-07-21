import * as WS from "websocket";
import logger from "../../lib/logger";

export function onRequest(request: WS.request) {
    logger.info("New connection");
    const connection = request.accept();
    onConnection(connection);
}

function onConnection(connection: WS.connection) {
    connection.on("message", (message: WS.IMessage) => {
        onMessage(connection, message);
    });
}

function onMessage(connection: WS.connection, message: WS.IMessage) {
    if (message.type === "utf8") {
        logger.info("New message");
        connection.sendUTF("Hello");
    }
}
