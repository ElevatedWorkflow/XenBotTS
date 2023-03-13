export default class EmbedParam {
    Name: string;
    Value: string;
    constructor(name: string, value: string){
        this.Name = name;
        this.Value = value as string;
    }
}