/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

/* export type TypeDocument = Type & Document; */

@Schema()
export class Type {

    @Prop()
    format: string;

    @Prop()
    theme: string;
}
export const TypeSchema = SchemaFactory.createForClass(Type);