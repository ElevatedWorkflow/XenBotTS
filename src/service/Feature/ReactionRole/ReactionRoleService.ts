import { GuildMember, MessageReaction, PartialMessageReaction, PartialUser, Role, User } from 'discord.js';
import { ReactionRoleModel, ReactionRoleGroup } from "../../../model"
import { XenCord, XenConfig, XenLogger } from '../../../system';
import { BaseService, MemberService, RoleService } from '../../../service';

export default class extends BaseService{
    RoleService: RoleService;
    MemberService: MemberService;

    constructor(config: XenConfig, logger: XenLogger, roleService: RoleService, memberService: MemberService){
        super(config, logger)
        this.RoleService = roleService;
        this.MemberService = memberService;
    }

    Validate = () => {
        return this.GetReactionRoleGroups().map((group: ReactionRoleGroup) => {
            group.Members.forEach((reactionRole: ReactionRoleModel) => {
                let role: Role = this.RoleService.GetRoleByName(reactionRole.RoleName)
                this.RoleService.ValidateRole(role, reactionRole.RoleName)
            })
        }).flat()
    }

    GetReactionRoleGroups(): ReactionRoleGroup[]{
        return this.Config.ReactionRole.members
    }

    IsRoleReaction = (reaction: MessageReaction | PartialMessageReaction) => {
        return this.GetAllReactionRoles().find((reactionRole: ReactionRoleModel) => { return reactionRole.Emoji == reaction.emoji.toString()})
    }

    GetReactionRole = (reaction: MessageReaction | PartialMessageReaction): ReactionRoleModel | undefined => {
        return this.GetAllReactionRoles().find((x: ReactionRoleModel) => { return x.Emoji == reaction.emoji.toString()})
    }

    GetAllReactionRoles() : ReactionRoleModel[] {
        return this.GetReactionRoleGroups().map((group: ReactionRoleGroup) => {
            return group.Members;
        }).flat()
    }

    SetupReactionRoleListeners = () => {
        XenCord.Client.on('messageReactionAdd', async (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
    
            if(reaction.emoji.name == "⭐"){
                await this.HandshakeTOS(user);
            } else {
                await this.ApplyReactionRoleChange(reaction, user);
            }
        });
    
        XenCord.Client.on('messageReactionRemove', async (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
        
            this.ApplyReactionRoleChange(reaction, user, true);
        });
    }

    HandshakeTOS = (user: User | PartialUser) => {
        const member: GuildMember | undefined = XenCord.Client.guilds.cache.get(this.Config.System.guildID)?.members.cache.get(user.id)
        member?.roles.add(this.RoleService.getRulesRole().id)
    }

    ApplyReactionRoleChange = async (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser, remove: boolean=false) => {
        let reactionRoleEmoji = this.IsRoleReaction(reaction)

        if(reactionRoleEmoji){
            const member: GuildMember = this.MemberService.GetMemberFromUser(user.id);
            const reactionRole: ReactionRoleModel = this.GetReactionRole(reaction)!
            const memberRole: Role = this.RoleService.GetRoleByName(reactionRole.RoleName);
            if(reactionRole){
                if(remove){
                    await member.roles.remove(memberRole);
                } else {
                    await member.roles.add(memberRole);
                }
            }
        }
    }
}