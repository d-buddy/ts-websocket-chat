export const APP_NAME: string = "anonymous-ws-messenger";
const ENV: string = process.env.NODE_ENV ? process.env.NODE_ENV : "dev";
export const VERSION: string = "0.0.1";

export function getEnv(): string {
    return ENV;
}
