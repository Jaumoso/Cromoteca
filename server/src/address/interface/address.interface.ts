import { Types } from "mongoose";

export interface IAddress extends Document {
    readonly street: string;
    readonly city: string;
    readonly postalCode: string;
    readonly province: string;
    readonly country: string;
}