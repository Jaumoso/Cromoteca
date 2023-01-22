/* import { CollectionFormat, CollectionTheme } from "../schema/collection.schema"; */

export interface ICollection extends Document {
    readonly name: string;
/*     readonly format: CollectionFormat;
    readonly theme: CollectionTheme; */
    readonly format: string;
    readonly theme: string;
    readonly size: number;
    readonly description: string;
    readonly year: number;
    readonly publisher: string;
    readonly language: string;
    readonly image: string;
}