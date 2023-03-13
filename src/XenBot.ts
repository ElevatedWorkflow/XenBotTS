import { Startup } from "./startup";
import { XenConfig, XenLogger} from "./system";

const _logger: XenLogger = new XenLogger();
const _config: XenConfig = new XenConfig(_logger);

const args = process.argv.slice(2);
class App{
    static Run = async () => {
        new Startup(_config, _logger).Run(args)
    }
}

App.Run()