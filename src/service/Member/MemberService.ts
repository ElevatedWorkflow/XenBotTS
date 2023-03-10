import { GuildMember } from 'discord.js';
import { ClientService, ConfigService } from '..';

export default class{
    GetMemberFromUser = (userID: string): GuildMember  => {
        return ClientService.Client.guilds.cache.get(ConfigService.System.guildID)?.members.cache.get(userID) as GuildMember
    }
}