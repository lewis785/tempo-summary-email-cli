export class ArgumentValidator {
    private readonly args: any;

    public constructor(args: any) {
        this.args = args;
    }

    public validate(): boolean {
        const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

        if (typeof this.args["start-date"] !== "undefined") {
            if (!dateFormat.test(this.args["start-date"])) {
                throw new Error(
                    `Invalid start date: ${this.args["start-date"]} Must be of format YYYY-MM-DD.`
                )
            }
        }

        if (typeof this.args["end-date"] !== "undefined") {
            if (!dateFormat.test(this.args["end-date"])) {
                throw new Error(
                    `Invalid end date: ${this.args["end-date"]} Must be of format YYYY-MM-DD.`
                )
            }
        }

        return true;
    }
}
