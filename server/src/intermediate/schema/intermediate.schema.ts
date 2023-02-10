import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";

export type IntermediateDocument = Intermediate & Document;

@Schema()
export class Intermediate {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    userId: mongoose.Schema.Types.ObjectId;

    @Prop({type: [{type: mongoose.Types.ObjectId, ref: 'Collection'}]})
    collectionId: mongoose.Schema.Types.ObjectId[];
}

export const IntermediateSchema = SchemaFactory.createForClass(Intermediate);