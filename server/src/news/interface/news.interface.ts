export interface INews extends Document {
    readonly title: string;
    readonly newsbody: string;
    readonly date: Date;
}