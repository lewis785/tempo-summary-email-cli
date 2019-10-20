import yargs from "yargs"
import moment from "moment"
import TempoSummaryEmail from "tempo-summary-email"
import { Config } from "./config";

export class Cli {

    private static getArgs(): any {
        return yargs
            .help()
            .option("today", {
                alias: "t",
                type: "boolean",
                describe: "Generate summary for today"
            })
            .option("date", {
                alias: "d",
                type: "string",
                describe: "Specific date [YYYY-MM-DD]"
            })
            .option("start-date", {
                alias: "s",
                type: "string",
                describe: "Start date [YYYY-MM-DD]"
            })
            .option("end-date", {
                alias: "e",
                type: "string",
                describe: "End date [YYYY-MM-DD]"
            })
            .option("config", {
                alias: "c",
                type: "string",
                default: "config.json",
                describe: "Config filepath"
            })
            .demandOption(['config'])
            .check(Cli.validateArgs)
            .argv;
    }

    private static validateArgs (args: any): boolean {
        const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

        if (typeof args["start-date"] !== "undefined") {
            if (!dateFormat.test(args["start-date"])) {
                throw new Error(
                    `Invalid start date: ${args["start-date"]} Must be of format YYYY-MM-DD.`
                )
            }
        }

        if (typeof args["end-date"] !== "undefined") {
            if (!dateFormat.test(args["end-date"])) {
                throw new Error(
                    `Invalid end date: ${args["end-date"]} Must be of format YYYY-MM-DD.`
                )
            }
        }

        return true;
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

        const config = new Config(argv.config);

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
