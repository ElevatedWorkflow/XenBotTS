import chalk from 'chalk';
import { XenMessage } from '..';

enum MessageCode {
    SYSTEM = "system",
    SUCCESS = "success",
    ERROR = "error",
    DEBUG = "debug"
}

export default class {
    Log =  {
        System(message: string){
            this.LogMessage(MessageCode.SYSTEM, message, chalk.yellow)
        },
        Error(error: unknown){
            if(error instanceof Error){
                this.LogMessage(MessageCode.ERROR, error.message, chalk.red)
            }
        },
        Success(message: string){
            this.LogMessage(MessageCode.SUCCESS, message, chalk.green)
        },
        LogMessage: (type: MessageCode, message: string, consoleColor: any) => {
            let prefix = consoleColor(XenMessage.Messages.logging.prefix[type])
            let logTime = chalk.blueBright(`${new Date().toLocaleDateString('en-US')} ${new Date().toLocaleTimeString('en-US')}`)
            console.log(`<${prefix}>: ${message} [${logTime}]`)
        }
    }
}