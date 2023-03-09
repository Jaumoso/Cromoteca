import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";

export type AdvertDocument = Advert & Document;

@Schema()
export class Advert {

    @Prop()
    elementId: mongoose.Types.ObjectId;

    @Prop()
    userId: mongoose.Types.ObjectId;

    @Prop()
    state: string;

    @Prop()
    price: number;
    
    @Prop()
    quantity: number;
}
export const AdvertSchema = SchemaFactory.createForClass(Advert);