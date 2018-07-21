import http from "http";
import getServerConfig from "./config/server";
import logger from "./lib/logger";

const {host, port} = getServerConfig();

const httpServer = http.createServer(((request, response) => {
    logger.info(request, response);
}));

httpServer.listen(port, host, () => {
    logger.info(`HTTP server started at ${host}:${port}`);
});

export default httpServer;
