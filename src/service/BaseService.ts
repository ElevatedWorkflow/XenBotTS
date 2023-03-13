import IService from '../model/Interface/IService';
import { XenConfig, XenLogger } from '../system';
export default class implements IService {
    Config: XenConfig;
    Logger: XenLogger;
    
    constructor(config: XenConfig, logger: XenLogger){
        this.Config = config;
        this.Logger = logger;
    }
}