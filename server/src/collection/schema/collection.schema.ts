/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

/* export type CollectionDocument = Collection & Document; */

/* export enum CollectionFormat {
    STACKS = 'STACKS',
    CARDS = 'CARDS',
}

export enum CollectionTheme {
    POKEMON = 'POKEMON',
    FIFA = 'FIFA',
    DIGIMON = 'DIGIMON',
} */

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