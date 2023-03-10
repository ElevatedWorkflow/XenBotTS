import { StartupService } from "./service"

const args = process.argv.slice(2);
class App{
    static Run = async () => {
        new StartupService().RunStartup(args)
    }
}

App.Run()