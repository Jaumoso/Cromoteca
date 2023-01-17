import { Types } from "mongoose";

export interface IUser extends Document {
    readonly email: string;
    readonly password: string;
    readonly username: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly entryDate: Date;
    readonly admin: boolean;
    readonly addressId: Types.ObjectId;
}