import { XenConfig, Logger } from "../../system";
import { ILoggable } from ".";

export default interface IService extends ILoggable {
    Logger: Logger;
    Config: XenConfig;
}