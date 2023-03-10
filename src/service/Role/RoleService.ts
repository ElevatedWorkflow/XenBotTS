import { GuildMember, Role } from 'discord.js';
import { ClientService, ConfigService, LoggingService } from '..';
import IValidatable from '../IValidatable';

export default class implements IValidatable {

    Validate = () => {
        LoggingService.Log.System(ConfigService.Message.system.startup.role.start)
        GetSystemRoles().forEach((option: string[]) => {
            let role: Role | undefined = this.GetRole(option[1])
            this.ValidateRole(role, option[0])
        })
        LoggingService.Log.System(ConfigService.Message.system.startup.role.done)
    }

    GetRole = (roleID: string): Role => {
        return ClientService.Client.guilds.cache.get(ConfigService.System.guildID)!.roles.cache.find((role: Role) => role.id === roleID) as Role;
    }

    GetRoleByName = (roleName: string): Role => {
        return ClientService.Client.guilds.cache.get(ConfigService.System.guildID)!.roles.cache.find((role: Role) => role.name === roleName) as Role;
    }

    getRulesRole = (): Role => {
        return ClientService.Client.guilds.cache.get(ConfigService.System.guildID)!.roles.cache.find((role: Role) => role.id === ("1081800627753062520")) as Role
    }

    ValidateRole = (role: Role, roleKey: string) => {
        if(role !== undefined){
            LoggingService.Log.Success(`${ConfigService.Message.system.startup.role.success}${roleKey} [${role.name}]`)
        } else {
            LoggingService.Log.Error(`${ConfigService.Message.error.startup.role}${roleKey}`)
        }
    }
}

const GetSystemRoles = () => {
    let roleConfig = Object(ConfigService.Role)
    return Object.keys(roleConfig).filter(option => { return option != "Name"}).map(role => { return [role, roleConfig[role]] });
}

const HasRole = (member: GuildMember, roleName: string) => {
    return member.roles.cache.find((role: Role) => role.name === roleName)
}