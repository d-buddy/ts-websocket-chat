import _ from "lodash";
import {getEnv} from "./app";

const serverConfig = {
    dev: {
        host: "0.0.0.0",
        port: 1337,
    },
    production: {
        host: "0.0.0.0",
        port: 1337,
    },
    staging: {
        host: "0.0.0.0",
        port: 1337,
    },
};

export default function getServerConfig(): any {
    const env = getEnv();
    return _.get(serverConfig, env);
}
