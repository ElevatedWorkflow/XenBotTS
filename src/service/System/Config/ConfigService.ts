import { LoggingService } from "../..";
import { ChannelJSON, ClientJSON, CommandJSON, ReactionRoleJSON, RoleJSON, SystemJSON, MessageJSON } from "./ConfigCollection";
import IValidatable from '../../IValidatable';


const ChannelConfig= ChannelJSON;
const ClientConfig = ClientJSON;
const CommandConfig = CommandJSON;
const ReactionRoleConfig = ReactionRoleJSON;
const RoleConfig = RoleJSON;
const SystemConfig = SystemJSON;
const MessageConfig = MessageJSON;

export default class ConfigService implements IValidatable {
    //TODO: Make a function that scans the config directory and puts them into a <String, JSON> Dictionary based on a highest level string name in the JSONs.
    static Channel = ChannelConfig;
    static Client = ClientConfig;
    static Command = CommandConfig;
    static ReactionRole = ReactionRoleConfig;
    static Role = RoleConfig;
    static System = SystemConfig;
    static Message = MessageConfig;

    public Validate = () => {    
        LoggingService.Log.System(ConfigService.Message.system.startup.config.start)
        GetAllConfigs().forEach(async config =>{
                try{
                    ValidateConfig(config)
                    LoggingService.Log.Success(`${ConfigService.Message.system.startup.config.success}${config.Name}`)
                } catch(e: unknown) {
                    if(e instanceof Error){
                        throw(e)
                    }
                }
            })
        LoggingService.Log.System(ConfigService.Message.system.startup.config.done)
    }
}

const GetAllConfigs = () => {
    return [
        ChannelConfig,
        ClientConfig,
        CommandConfig,
        ReactionRoleConfig,
        RoleConfig,
        SystemConfig,
        MessageConfig
    ]
}

//TODO: Make functions or template classes to more thoroughly insure validity of the JSON form.
const ValidateConfig = (config: any): boolean => { 
    try {
        let configJSON = JSON.parse(JSON.stringify(config));
        if(configJSON == null){
            return false;
        }
    } catch(e: unknown) {
        if(e instanceof Error){
            throw(Error(`${ConfigService.Message.error.startup.config}${config.Name}:\n${e.message}`))
        }
    }
    return true;
}