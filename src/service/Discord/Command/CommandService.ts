import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { CommandInteraction } from 'discord.js';
import IService from '../../../model/Interface/IService';
import { BaseService } from '../../../service';
import { XenConfig, XenLogger, XenMessage } from '../../../system';


export default class CommandService extends BaseService implements IService {
  REST: REST;

  constructor(config: XenConfig, logger: XenLogger){
    super(config, logger)
    this.REST = new REST({ version: '9' }).setToken(this.Config.Client.Token);
  }

  Register = async () => {
    try {
      this.Logger.Log.System(`${XenMessage.Messages.command.register.prefix} ${XenMessage.Messages.command.register.start}`);

      await this.REST.put(Routes.applicationCommands(this.Config.Client.applicationID), 
        { body: [this.Config.Command.slashcommands.support, this.Config.Command.slashcommands.claim] });

      this.Config.Logger.Log.Success(`${XenMessage.Messages.command.register.prefix} ${XenMessage.Messages.command.register.success}`);
    } catch (error) {
      console.error(error);
    }
  }

  async Bind(interaction: CommandInteraction){
    // * SUPPORT FUNCTION HANDLERS
    if (interaction.commandName === this.Config.Command.slashcommands.support.name ) {
      try {
        await interaction.reply({ ephemeral: true, content: "This function does not work yet!!"})
      } catch(e) {
        this.Logger.Log.Error(e)
      }
    } else if (interaction.commandName === this.Config.Command.slashcommands.claim.name) {
      try {
        await interaction.reply({ ephemeral: true, content: "This function does not work yet!!"})
      } catch(e) {
        this.Logger.Log.Error(e)
      }
    }
  }
}