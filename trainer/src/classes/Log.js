import { AppSettings } from "../config/AppSettings.js";

export class Log {
    static writeLog(message, level) {
        const loggingLevel = AppSettings.debugLevel;
        if (level > loggingLevel) {
            // debugLevel is set too low to log this message
            return;
        } else {
            console.log(message);
        }
    }
}