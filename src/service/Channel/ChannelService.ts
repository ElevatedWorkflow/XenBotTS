import { TextChannel } from "discord.js";
import { ClientService, LoggingService } from "..";
import ConfigService from '../../factory/Config/ConfigFactory';
import IValidatable from '../IValidatable';

export default class ChannelService implements IValidatable {    
    Validate = () => {
        LoggingService.Log.System(ConfigService.Message.system.startup.channel.start)
        GetSystemChannels().forEach((option: string[]) => {
            let channel: TextChannel | undefined = this.GetChannel(option[1])
            if(channel !== undefined){
                LoggingService.Log.Success(`${ConfigService.Message.system.startup.channel.success}${option[0]} [${channel.name}]`)
            } else {
                LoggingService.Log.Error(`${ConfigService.Message.error.startup.channel}${option}`)
            }
        })
        LoggingService.Log.System(ConfigService.Message.system.startup.channel.done)
    }

    GetChannel = (channelID: string): TextChannel => {
        return ClientService.Client.channels.cache.get(channelID) as TextChannel
    }

    GetSystemChannel = (channelIndex: string): TextChannel => {
        return this.GetChannel(GetSystemChannels().find(channel => { return channel[0] == channelIndex })[1])
    }
}

const GetSystemChannels = (): any[] =>{
    //TODO: Turn this into a "GetOptions" param on Config JSONs
    let channelConfig = Object(ConfigService.Channel)
    return Object.keys(channelConfig).filter(option => { return option != "Name"}).map(channel => { return [channel, channelConfig[channel]] });
}