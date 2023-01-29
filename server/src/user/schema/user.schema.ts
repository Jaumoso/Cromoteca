/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Address } from "cluster";
import mongoose from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    username: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    entryDate: Date;

    @Prop()
    admin: boolean;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Address'})
    addressId: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);