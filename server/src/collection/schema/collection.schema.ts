import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type CollectionDocument = Collection & Document

@Schema()
export class Collection {

    @Prop()
    name: string;

    @Prop()
    /* format: CollectionFormat; */
    format: string;

    @Prop()
    /* theme: CollectionTheme; */
    theme: string;

    @Prop()
    size: number;

    @Prop()
    description: string;

    @Prop()
    year: number;

    @Prop()
    publisher: string;

    @Prop()
    language: string;

    @Prop()
    image: string;
}
export const CollectionSchema = SchemaFactory.createForClass(Collection);