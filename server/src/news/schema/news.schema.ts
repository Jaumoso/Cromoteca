/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

/* export type NewsDocument = News & Document; */

@Schema()
export class News {

    @Prop()
    title: string;

    @Prop()
    newsbody: string;

    @Prop()
    date: Date;

}
export const NewsSchema = SchemaFactory.createForClass(News);