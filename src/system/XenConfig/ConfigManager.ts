import { ChannelJSON, ClientJSON, CommandJSON, ReactionRoleJSON, RoleJSON, SystemJSON } from "./ConfigCollection"
import { Logger, XenMessage } from ".."
import { IValidatable } from "src/model"


const ChannelConfig= ChannelJSON
const ClientConfig = ClientJSON
const CommandConfig = CommandJSON
const ReactionRoleConfig = ReactionRoleJSON
const RoleConfig = RoleJSON
const SystemConfig = SystemJSON

export default class implements IValidatable {  
    Logger: Logger;
    
    //TODO: Make a function that scans the config directory and puts them into a <String, JSON> Dictionary based on a highest level string name in the JSONs.
    Channel = ChannelConfig
    Client = ClientConfig
    Command = CommandConfig
    ReactionRole = ReactionRoleConfig
    Role = RoleConfig
    System = SystemConfig

    constructor(logger: Logger){
        this.Logger = logger;
    }

    public Validate = () => {    
        this.Logger.Log.System(XenMessage.Messages.system.startup.config.start)
        GetAllConfigs().forEach(async config =>{
                try{
                    this.ValidateConfig(config)
                    this.Logger.Log.Success(`${XenMessage.Messages.system.startup.config.success}${config.Name}`)
                } catch(e: unknown) {
                    if(e instanceof Error){
                        throw(e)
                    }
                }
            })
        this.Logger.Log.System(XenMessage.Messages.system.startup.config.done)
    }

    //TODO: Make functions or template classes to more thoroughly insure validity of the JSON form.
    ValidateConfig = (config: any): boolean => { 
        try {
            let configJSON = JSON.parse(JSON.stringify(config));
            if(configJSON == null){
                return false;
            }
        } catch(e: unknown) {
            if(e instanceof Error){
                throw(Error(`${XenMessage.Messages.error.startup.config}${config.Name}:\n${e.message}`))
            }
        }
        return true;
    }
}

const GetAllConfigs = () => {
    return [
        ChannelConfig,
        ClientConfig,
        CommandConfig,
        ReactionRoleConfig,
        RoleConfig,
        SystemConfig
    ]
}