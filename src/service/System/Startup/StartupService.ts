import { GuildMember, Role } from "discord.js"
import { ClientService, ConfigService, LoggingService, ServiceFactory } from ".."

export default class {
    ServiceFactory: ServiceFactory = new ServiceFactory()

    RunStartup(args: string[]){
        LoggingService.Log.System(ConfigService.Message.system.startup.start)
        try{
            this.ServiceFactory.Config.Validate() //Import And Validate Config Files
            ClientService.Client.once('ready', async () => {
                this.ServiceFactory.Channel.Validate() //Validate System Channels
                this.ValidateAllRoles()

                this.SetupDefaultRoles() //Setup Default Roles
                this.ServiceFactory.ReactionRole.SetupReactionRoleListeners()//Setup Reaction Roles
                //Register Slash Commands
                //Setup Reaction Listeners
                //Setup System Messages
                //Setup Command Bindings
                LoggingService.Log.System(ConfigService.Message.system.startup.success)
            })
            ClientService.Client.login(ConfigService.Client.Token);
        } catch(e: unknown) {
            LoggingService.Log.Error(e)
            return;
        }
    }

    ValidateAllRoles = () => {
        this.ServiceFactory.Role.Validate() //Validate System Roles
        this.ServiceFactory.ReactionRole.Validate(); //Validate Reaction Roles
    }

    SetupDefaultRoles = () => {
        ClientService.Client.on('guildMemberAdd', async (member: GuildMember) => {
            LoggingService.Log.System(`${ConfigService.Message.system.member.lognew}${member.user.username}`)
            if (member.user.bot) {
                member.roles.add(this.ServiceFactory.Role.GetRole(ConfigService.Role.BotRole)).then(() => { 
                    console.log(`Applied bot role to ${member.user.tag}`);
                }).catch((error) => 
                    console.error(`Error applying bot role: ${error}`)
                );
            } else {
                let userRole: Role = this.ServiceFactory.Role.GetRole(ConfigService.Role.DefaultRole)
                member.roles.add(userRole).then(() => {
                    console.log(`Applied human role to ${member.user.tag}`)
                    this.ServiceFactory.Channel.GetSystemChannel("Welcome").send(`${ConfigService.Message.system.member.join} ${member}`)
                }).catch((error) => console.error(`Error applying human role: ${error}`));
            }
        });
        LoggingService.Log.System(ConfigService.Message.system.startup.defaultroles)
    }

}

// const PostReactionRoleMessage = async (reactionRoleMessage: ReactionRoleMessage) => {
//     await ServiceFactory.Channel.GetChannel(ConfigService.Channel.ReactionRole)!.send({ embeds: [reactionRoleMessage.Embed] }).then((message: Message) => {
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





