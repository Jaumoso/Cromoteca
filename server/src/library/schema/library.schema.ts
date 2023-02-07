import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";

export type LibraryDocument = Library & Document;

@Schema()
export class Library {

    @Prop({type: [{type: mongoose.Types.ObjectId, ref: 'Collection'}]})
    collectionId: mongoose.Schema.Types.ObjectId;

    @Prop({type: [{type: mongoose.Types.ObjectId, ref: 'User'}]})
    userId: mongoose.Schema.Types.ObjectId;

}
export const LibrarySchema = SchemaFactory.createForClass(Library);