import { ConfigService } from "../service";

class AbstractBase{
    constructor(){
        if(this.constructor == AbstractBase){
            throw new Error(ConfigService.Message.error.abstract.constructor);
        }
    }
}