import { ReactionRoleModel, ReactionRoleGroup } from "src/model"
import { ChannelService, ConfigService, MemberService, ReactionRoleService, RoleService, ClientService } from "."
import { Role, MessageReaction, PartialMessageReaction, User, PartialUser, GuildMember } from 'discord.js';

export default class {
    //System Services
    Config: ConfigService = new ConfigService()

    //Client Services
    Role: RoleService = new RoleService()
    Channel: ChannelService = new ChannelService()
    Member: MemberService = new MemberService()

    //Namespace Services
    ReactionRoleService = new ReactionRoleService()

    ReactionRole = {
        Validate: () => {
            return this.ReactionRoleService.GetReactionRoleGroups().map((group: ReactionRoleGroup) => {
                group.Members.forEach((reactionRole: ReactionRoleModel) => {
                    let role: Role = this.Role.GetRoleByName(reactionRole.RoleName)
                    this.Role.ValidateRole(role, reactionRole.RoleName)
                })
            }).flat()
        },
        IsRoleReaction: (reaction: MessageReaction | PartialMessageReaction) => {
            return this.ReactionRoleService.IsRoleReaction(reaction)
        },
        GetReactionRole: (reaction: MessageReaction | PartialMessageReaction) => {
            return this.ReactionRoleService.GetReactionRole(reaction)
        },
        SetupReactionRoleListeners: () => {
            ClientService.Client.on('messageReactionAdd', async (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
        
                if(reaction.emoji.name == "⭐"){
                    await this.ReactionRole.HandshakeTOS(user);
                } else {
                    await this.ReactionRole.ApplyReactionRoleChange(reaction, user);
                }
            });
        
            ClientService.Client.on('messageReactionRemove', async (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
            
                await this.ReactionRole.ApplyReactionRoleChange(reaction, user, true);
            });
        },
        HandshakeTOS : (user: User | PartialUser) => {
            const member: GuildMember | undefined = ClientService.Client.guilds.cache.get(ConfigService.System.guildID)?.members.cache.get(user.id)
            member?.roles.add(this.Role.getRulesRole().id)
        },
        ApplyReactionRoleChange: async (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser, remove: boolean=false) => {
            let reactionRoleEmoji = this.ReactionRole.IsRoleReaction(reaction)
            if(reactionRoleEmoji){
                const member: GuildMember = this.Member.GetMemberFromUser(user.id);
                const reactionRole: ReactionRoleModel = this.ReactionRole.GetReactionRole(reaction)!
                const memberRole: Role = this.Role.GetRoleByName(reactionRole.RoleName);
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
    

}