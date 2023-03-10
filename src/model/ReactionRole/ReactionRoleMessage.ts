import { EmbedBuilder } from 'discord.js';
import ReactionRoleGroup from './ReactionRoleGroup';
export default class ReactionRoleMessage {
    Embed: EmbedBuilder;
    ReactionRoleGroup: ReactionRoleGroup;
    constructor(embed: EmbedBuilder, reactionRoleGroup: ReactionRoleGroup){
        this.Embed = embed;
        this.ReactionRoleGroup = reactionRoleGroup;
    }
}