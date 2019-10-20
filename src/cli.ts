import yargs from "yargs"
import moment from "moment"
import TempoSummaryEmail from "tempo-summary-email"
import { Config } from "./config";
import { ArgumentValidator } from "./Validation/argument-validator";

export class Cli {

    private static getArgs(): any {
        return yargs
            .help()
            .option("today", {
                alias: "t",
                type: "boolean",
                describe: "Summary for today"
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
                describe: "Summary til end date [YYYY-MM-DD]"
            })
            .check(Cli.validateArgs)
            .argv;
    }

    private static validateArgs (args: any): boolean {
        return (new ArgumentValidator(args)).validate()
    }

    public execute() {
        const argv = Cli.getArgs();

        let start = "";
        let end = "";

        if (argv.today === true) {
            start = moment(new Date()).format("Y-M-D");
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

        const config = new Config(__dirname + '/../config.json');

        const test = new TempoSummaryEmail({
            jiraApiKey: config.getJiraToken(),
            jiraDomain: config.getJiraDomain(),
            jiraUsername: config.getJiraUsername(),
            tempoApiKey: config.getTempoToken()
        });

        test.generateEmailForRange(start, end).then((response) => {
            console.log(response);
        });
    }
}
