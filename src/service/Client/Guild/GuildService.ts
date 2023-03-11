import { Guild } from 'discord.js';
import { ConfigService } from '..';
import { ClientService} from ".."

export default class {
    static Guild = () => ClientService.Client.guilds.cache.get(ConfigService.System.guildID) as Guild
}