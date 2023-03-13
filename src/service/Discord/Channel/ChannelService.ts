import { TextChannel } from "discord.js";
import IValidatable from '../../../model/Interface/IValidatable';
import IService from '../../../model/Interface/IService';
import { XenCord, XenMessage } from "../../../system";
import { BaseService } from "../../../service";

export default class ChannelService extends BaseService implements IValidatable, IService {    
    Validate = () => {
        this.Logger.Log.System(XenMessage.Messages.system.startup.channel.start)
        this.GetSystemChannels().forEach((option: string[]) => {
            let channel: TextChannel | undefined = this.GetChannel(option[1])
            if(channel !== undefined){
                this.Logger.Log.Success(`${XenMessage.Messages.system.startup.channel.success}${option[0]} [${channel.name}]`)
            } else {
                this.Logger.Log.Error(`${XenMessage.Messages.error.startup.channel}${option}`)
            }
        })
        this.Logger.Log.System(XenMessage.Messages.system.startup.channel.done)
    }

    GetChannel = (channelID: string): TextChannel => {
        return XenCord.Client.channels.cache.get(channelID) as TextChannel
    }

    GetSystemChannel = (channelIndex: string): TextChannel => {
        return this.GetChannel(this.GetSystemChannels().find(channel => { return channel[0] == channelIndex })[1])
    }

    GetSystemChannels = (): any[] =>{
        //TODO: Turn this into a "GetOptions" param on Config JSONs
        let channelConfig = Object(this.Config.Channel)
        return Object.keys(channelConfig).filter(option => { return option != "Name"}).map(channel => { return [channel, channelConfig[channel]] });
    }
}