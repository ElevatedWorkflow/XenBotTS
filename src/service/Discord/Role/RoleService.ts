import { GuildMember, Role } from 'discord.js';
import { BaseService } from '../..';
import IValidatable from '../../../model/Interface/IValidatable';
import { XenCord, XenMessage } from '../../../system';

export default class extends BaseService implements IValidatable {

    Validate = () => {
        this.Logger.Log.System(XenMessage.Messages.system.startup.role.start)
        this.GetSystemRoles().forEach((option: string[]) => {
            let role: Role | undefined = this.GetRole(option[1])
            this.ValidateRole(role, option[0])
        })
        this.Logger.Log.System(XenMessage.Messages.system.startup.role.done)
    }

    GetRole = (roleID: string): Role => {
        return XenCord.Client.guilds.cache.get(this.Config.System.guildID)!.roles.cache.find((role: Role) => role.id === roleID) as Role;
    }

    GetRoleByName = (roleName: string): Role => {
        return XenCord.Client.guilds.cache.get(this.Config.System.guildID)!.roles.cache.find((role: Role) => role.name === roleName) as Role;
    }

    getRulesRole = (): Role => {
        return XenCord.Client.guilds.cache.get(this.Config.System.guildID)!.roles.cache.find((role: Role) => role.id === ("1081800627753062520")) as Role
    }

    ValidateRole = (role: Role, roleKey: string) => {
        if(role !== undefined){
            this.Logger.Log.Success(`${XenMessage.Messages.system.startup.role.success}${roleKey} [${role.name}]`)
        } else {
            this.Logger.Log.Error(`${XenMessage.Messages.error.startup.role}${roleKey}`)
        }
    }

    GetSystemRoles = () => {
        let roleConfig = Object(this.Config.Role)
        return Object.keys(roleConfig).filter(option => { return option != "Name"}).map(role => { return [role, roleConfig[role]] });
    }
}

const HasRole = (member: GuildMember, roleName: string) => {
    return member.roles.cache.find((role: Role) => role.name === roleName)
}