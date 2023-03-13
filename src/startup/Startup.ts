import { GuildMember, Role } from "discord.js"
import { XenCord, XenConfig, XenLogger, XenMessage } from '../system';
import { ChannelService, CommandService, EmbedService, GuildService, MemberService, ReactionRoleService, RoleService } from "../service";

export default class {
    Config: XenConfig
    Logger: XenLogger
    ChannelService: ChannelService
    CommandService: CommandService
    EmbedService: EmbedService
    GuildService: GuildService
    MemberService: MemberService
    RoleService: RoleService
    ReactionRoleService: ReactionRoleService

    constructor(config: XenConfig, logger: XenLogger){
        this.Config = config
        this.Logger = logger
        this.ChannelService = new ChannelService(this.Config, this.Logger)
        this.CommandService = new CommandService(this.Config, this.Logger)
        this.EmbedService = new EmbedService(this.Config, this.Logger)
        this.GuildService = new GuildService(this.Config, this.Logger)
        this.MemberService = new MemberService(this.Config, this.Logger)
        this.RoleService = new RoleService(this.Config, this.Logger)
        this.ReactionRoleService = new ReactionRoleService(this.Config, this.Logger, this.RoleService, this.MemberService)
    }

    Run(args: string[]){
        this.Logger.Log.System(XenMessage.Messages.system.startup.start)
        try{
            this.Config.Validate() //Import And Validate Config Files
            XenCord.Client.once('ready', async () => {
                this.ChannelService.Validate() //Validate System Channels
                this.ValidateAllRoles() //Validate Reaction and Default roles

                this.SetupDefaultRoles() //Setup Default Roles
                this.ReactionRoleService.SetupReactionRoleListeners()//Setup Reaction Roles
                //Register Slash Commands
                //Setup Reaction Listeners
                //Setup System Messages
                //Setup Command Bindings
                this.Logger.Log.System(XenMessage.Messages.system.startup.success)
            })
            XenCord.Client.login(this.Config.Client.Token);
        } catch(e: unknown) {
            this.Logger.Log.Error(e)
            return;
        }
    }

    ValidateAllRoles = () => {
        this.RoleService.Validate() //Validate System Roles
        this.ReactionRoleService.Validate(); //Validate Reaction Roles
    }

    SetupDefaultRoles = () => {
        XenCord.Client.on('guildMemberAdd', async (member: GuildMember) => {
            this.Logger.Log.System(`${XenMessage.Messages.system.member.lognew}${member.user.username}`)
            if (member.user.bot) {
                member.roles.add(this.RoleService.GetRole(this.Config.Role.BotRole)).then(() => { 
                    this.Logger.Log.System(`Applied bot role to ${member.user.tag}`);
                }).catch((error) => 
                    console.error(`Error applying bot role: ${error}`)
                );
            } else {
                let userRole: Role = this.RoleService.GetRole(this.Config.Role.DefaultRole)
                member.roles.add(userRole).then(() => {
                    this.Logger.Log.System(`Applied human role to ${member.user.tag}`)
                    this.ChannelService.GetSystemChannel("Welcome").send(`${XenMessage.Messages.system.member.join} ${member}`)
                }).catch((error) => this.Logger.Log.Error(`Error applying human role: ${error}`));
            }
        });
        this.Logger.Log.System(XenMessage.Messages.system.startup.defaultroles)
    }

}

// const PostReactionRoleMessage = async (reactionRoleMessage: ReactionRoleMessage) => {
//     await ServiceFactory.Channel.GetChannel(this.Config.Channel.ReactionRole)!.send({ embeds: [reactionRoleMessage.Embed] }).then((message: Message) => {
//         reactionRoleMessage.ReactionRoleGroup.Members.forEach((role: ReactionRoleModel) => {
//             message.react(role.Emoji);
//         });
//     });
// }

// const PostAllReactionRoleMessages = () => {
//     ServiceFactory.ReactionRoleService.GetReactionRoleGroups().forEach((group: ReactionRoleGroup) => {
//         PostReactionRoleMessage(new ReactionRoleMessage(EmbedService.CreateReactionRoleEmbed(group), group))
//     })
// }





