import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type AddressDocument = Address & Document;

@Schema()
export class Address {

    @Prop()
    street: string;

    @Prop()
    city: string;

    @Prop()
    postalCode: string;

    @Prop()
    province: string

    @Prop()
    country: string
}
export const AddressSchema = SchemaFactory.createForClass(Address);