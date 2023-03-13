import { EmbedBuilder } from "discord.js";
import { BaseService } from '../../..//service';
import { ReactionRoleGroup, ReactionRoleModel } from "../../../model/";
import EmbedParam from "./EmbedParam";

export default class extends BaseService {
    static CreateReactionRoleEmbed(reactionRoleGroup: ReactionRoleGroup): EmbedBuilder {
        const EmbedField: EmbedParam[] = reactionRoleGroup.Members.map((member: ReactionRoleModel) => { return new EmbedParam(member.RoleName, member.Emoji) })
        return CreateBasicEmbedFromData(reactionRoleGroup.Name, reactionRoleGroup.Message, EmbedField, reactionRoleGroup.Inline)
    };
    
}

const CreateBasicEmbed = (title: string, description: string): EmbedBuilder => {
    return new EmbedBuilder().setTitle(title).setDescription(description).setColor('#ff0000');
}



const CreateBasicEmbedFromData = (title: string, description:string , EmbedParam: EmbedParam[], inline: boolean): EmbedBuilder => {
    var embed = CreateBasicEmbed(title, description);
    EmbedParam.forEach((data) => {
        if(inline){
            embed.addFields({name: data.Name, value: data.Value, inline: true});
        } else {
            embed.addFields({name: `${data.Name} // ${data.Value}`, value: "--------------------", inline: false})
        }
    });
    return embed;
}