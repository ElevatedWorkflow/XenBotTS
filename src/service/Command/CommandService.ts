
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { CommandInteraction } from 'discord.js';
import { ConfigService } from '..';


export default class CommandService {
  static rest = new REST({ version: '9' }).setToken(ConfigService.Client.Token);

  static Register = async () => {
    try {
      console.log(`${ConfigService.Message.command.register.prefix} ${ConfigService.Message.command.register.start}`);

      await this.rest.put(Routes.applicationCommands(ConfigService.Client.applicationID), 
        { body: [ConfigService.Command.slashcommands.support, ConfigService.Command.slashcommands.claim] });

      console.log(`${ConfigService.Message.command.register.prefix} ${ConfigService.Message.command.register.success}`);
    } catch (error) {
      console.error(error);
    }
  }

  static async Bind(interaction: CommandInteraction){
    // * SUPPORT FUNCTION HANDLERS
    if (interaction.commandName === ConfigService.Command.slashcommands.support.name ) {
      try {
        await interaction.reply({ ephemeral: true, content: "This function does not work yet!!"})
      } catch(e) {
        console.log(e)
      }
    } else if (interaction.commandName === ConfigService.Command.slashcommands.claim.name) {
      try {
        await interaction.reply({ ephemeral: true, content: "This function does not work yet!!"})
      } catch(e) {
        console.log(e)
      }
    }
  }
}