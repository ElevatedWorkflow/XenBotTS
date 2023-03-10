import { ConfigService } from '..';
import { MessageReaction, PartialMessageReaction } from 'discord.js';
import { ReactionRoleModel, ReactionRoleGroup } from "../../model/"

export default class {
    GetReactionRole(reaction: MessageReaction | PartialMessageReaction): ReactionRoleModel | undefined {
        return this.GetAllReactionRoles().find((reactionRole: ReactionRoleModel) => {
            return reactionRole.Emoji == reaction.emoji.toString();
        })
    }

    IsRoleReaction = (reaction: MessageReaction | PartialMessageReaction ): boolean => {
        return this.GetAllReactionEmojis().includes(reaction.emoji.toString())
    }

    GetReactionRoleGroups = (): ReactionRoleGroup[] => {
        return Array(ConfigService.ReactionRole.members).flat()
    }

    GetAllReactionRoles = () : ReactionRoleModel[] => {
        return this.GetReactionRoleGroups().map((group: ReactionRoleGroup) => {
            return group.Members;
        }).flat()
    }
    
    GetAllReactionRoleRoleNames = () : string[] => {
        return this.GetReactionRoleGroups().map((group: ReactionRoleGroup) => {
            return group.Members;
        }).flat().map(role => { return role.RoleName; })
    }

    GetAllReactionEmojis = (): string[] => {
        return this.GetAllReactionRoles().map((reactionRole: ReactionRoleModel) => { return reactionRole.Emoji }) 
    }
}