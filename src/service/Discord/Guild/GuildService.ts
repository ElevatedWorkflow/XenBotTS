import { Guild } from 'discord.js';
import { BaseService } from '../../..//service';
import {XenCord, Logger} from '../../../system/';
import { XenConfig } from '../../../system';

export default class extends BaseService {
    
    constructor(config: XenConfig, logger: Logger){
        super(config, logger)
    }

    Guild = () => XenCord.Client.guilds.cache.get(this.Config.System.guildID) as Guild
}