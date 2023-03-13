import { GuildMember } from 'discord.js';
import { BaseService } from '../../../service';
import { XenCord } from '../../../system/';

export default class extends BaseService {
    GetMemberFromUser = (userID: string): GuildMember  => {
        return XenCord.Client.guilds.cache.get(this.Config.System.guildID)?.members.cache.get(userID) as GuildMember
    }
}