export class ArgumentValidator {
    private readonly args: any;

    public constructor(args: any) {
        this.args = args;
    }

    private static validateDate(value: string) {
        const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

        if (typeof value !== "undefined") {
            if (!dateFormat.test(value)) {
                throw new Error(
                    `Invalid date: ${value} Must be of format YYYY-MM-DD.`
                )
            }
        }
    }

    public validate(): boolean {
        ArgumentValidator.validateDate(this.args["date"]);
        ArgumentValidator.validateDate(this.args["start-date"]);
        ArgumentValidator.validateDate(this.args['end-date']);

        return true;
    }
}
