import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";

export type CardDocument = Card & Document;

@Schema()
export class Card {

    @Prop()
    userId: mongoose.Types.ObjectId;

    @Prop()
    collectionId: mongoose.Types.ObjectId;

    @Prop()
    cardId: number;

    @Prop()
    name: string;

    @Prop()
    quantity: number;

    @Prop()
    description: string;

/*     @Prop()
    image: string; */

    @Prop()
    state: string;

    @Prop()
    price: number;

}
export const CardSchema = SchemaFactory.createForClass(Card);