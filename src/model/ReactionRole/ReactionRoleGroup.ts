import ReactionRole from "./ReactionRole";

export default class ReactionRoleGroupModel {
    Name: string;
    Message: string;
    Members: ReactionRole[]
    Inline: boolean

    constructor(name: string, message: string, members: ReactionRole[], inline: boolean){
        this.Name = name
        this.Message = message
        this.Members = members
        this.Inline = inline
    }
}