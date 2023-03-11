import chalk from 'chalk';
import { ConfigService } from '..';
enum MessageCode {
    SYSTEM = "system",
    SUCCESS = "success",
    ERROR = "error"
}

const LogMessage = (type: MessageCode, message: string, consoleColor: any) => {
    let prefix = consoleColor(ConfigService.Message.logging.prefix[type])
    let logTime = chalk.blueBright(`${new Date().toLocaleDateString('en-US')} ${new Date().toLocaleTimeString('en-US')}`)
    console.log(`<${prefix}>: ${message} [${logTime}]`)
}

export default class {
    static Log =  {
        System(message: string){
            LogMessage(MessageCode.SYSTEM, message, chalk.yellow)
        },
        Error(error: unknown){
            if(error instanceof Error){
                LogMessage(MessageCode.ERROR, error.message, chalk.red)
            }
        },
        Success(message: string){
            LogMessage(MessageCode.SUCCESS, message, chalk.green)
        }
    }
}