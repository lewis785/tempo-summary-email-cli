import fs from "fs";

interface ConfigData {
    tempoToken: string,
    jiraToken: string,
    jiraUsername: string,
    jiraDomain: string
}

export class Config {
    private static generateConfigError(param: string) {
        console.log(`Config is missing property: "${param}"`);
        process.exit()
    }

    // @ts-ignore
    private static retrieveConfigFile (filePath: string): ConfigData {
        try {
            if (!fs.existsSync(filePath)) {
                console.log(`Could not find config file in path: "${filePath}"`);
                process.exit();
            }
            return JSON.parse(fs.readFileSync(filePath).toString()) as ConfigData;
        } catch (e) {
            console.log(`An error occurred while access config file. ERROR: ${e.message} `);
            process.exit()
        }
    }

    private readonly configData: ConfigData;

    constructor (filePath: string) {
        this.configData = Config.retrieveConfigFile(filePath);
    }

    public getJiraDomain(): string {
        if (typeof this.configData.jiraDomain === "undefined") {
            Config.generateConfigError('jiraDomain')
        }
        return this.configData.jiraDomain;
    }

    public getJiraToken(): string {
        if (typeof this.configData.jiraToken === "undefined") {
            Config.generateConfigError('jiraToken')
        }
        return this.configData.jiraToken;
    }

    public getJiraUsername(): string {
        if (typeof this.configData.jiraUsername === "undefined") {
            Config.generateConfigError('jiraUser')
        }
        return this.configData.jiraUsername;
    }

    public getTempoToken(): string {
        if (typeof this.configData.tempoToken === "undefined") {
            Config.generateConfigError('tempoToken')
        }
        return this.configData.tempoToken;
    }

}
