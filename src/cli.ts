import yargs from "yargs"
import moment from "moment"
import TempoSummaryEmail from "tempo-summary-email"
import { Config } from "./config";
import { ArgumentValidator } from "./Validation/argument-validator";
import fs from "fs";

export class Cli {
    private static readonly configPath = `${__dirname}/../config.json`;

    private static getArgs(): any {
        return yargs
            .help()
            .option("today", {
                alias: "t",
                type: "boolean",
                describe: "Summary for today"
            })
            .option("yesterday", {
                alias: "y",
                type: "boolean",
                describe: "Summary for yesterday"
            })
            .option("date", {
                alias: "d",
                type: "string",
                describe: "Summary for specific date [YYYY-MM-DD]"
            })
            .option("start-date", {
                alias: "s",
                type: "string",
                describe: "Summary from start date [YYYY-MM-DD]"
            })
            .option("end-date", {
                alias: "e",
                type: "string",
                describe: "Summary to end date [YYYY-MM-DD]"
            })
            .check(this.validateArgs)
            .argv;
    }

    private static getStartAndEndDate(argv: any) {
        let start = "";
        let end = "";

        if (argv.today === true) {
            start = moment(new Date()).format("Y-M-D");
            end = start
        } else if (argv.yesterday === true) {
            start = moment(new Date()).subtract(1, "day").format("Y-M-D");
            end = start;
        } else if (typeof argv.date !== "undefined") {
            start = argv.date;
            end = start;
        } else {
            if (typeof argv["start-date"] === "undefined") {
                console.log("Missing start date, make sure to add \"-s\"");
                process.exit();
            }
            start = argv["start-date"] as string;

            if (typeof argv["end-date"] === "undefined") {
                console.log("Missing end date, make sure to add \"-e\"");
                process.exit();
            }

            end = argv["end-date"] as string;
        }
        return {"start": start, "end": end};
    }

    private static validateArgs (args: any) {
        if (!fs.existsSync(Cli.configPath)) {
            throw new Error(`Could not find config file in path: "${Cli.configPath}"`);
        }

        return (new ArgumentValidator(args)).validate()
    }

    public execute() {
        const argv = Cli.getArgs();
        const dateArray = Cli.getStartAndEndDate(argv);

        const config = new Config(__dirname + '/../config.json');
        const test = new TempoSummaryEmail({
            jiraApiKey: config.getJiraToken(),
            jiraDomain: config.getJiraDomain(),
            jiraUsername: config.getJiraUsername(),
            tempoApiKey: config.getTempoToken()
        });

        test.generateEmailForRange(dateArray["start"], dateArray["end"]).then((response) => {
            console.log(response);
        });
    }
}
