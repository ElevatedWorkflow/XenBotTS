export default class ReactionRoleModel {
    RoleName: string;
    Emoji: string;
    constructor(roleName: string, emoji: string){
        this.RoleName = roleName; //Change to role using GetRole
        this.Emoji = emoji;
    }
}