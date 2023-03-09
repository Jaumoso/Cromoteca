import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateAdvertDto {

    @ApiProperty({
        type: mongoose.Types.ObjectId,
        description: 'ID of the element in the cards table',
        example: new mongoose.Types.ObjectId,
    })
    @IsNotEmpty()
    elementId: mongoose.Types.ObjectId;

    @ApiProperty({
        type: mongoose.Types.ObjectId,
        description: 'ID of the user in the users table',
        example: new mongoose.Types.ObjectId,
    })
    @IsNotEmpty()
    userId: mongoose.Types.ObjectId;

    @ApiProperty({
        type: String, 
        description: 'State of the card or element, in which state it is phisicically.',
        example: 'example state'
    })
    @IsNotEmpty()
    @IsString()
    state: string;

    @ApiProperty({
        type: Number,
        description: 'Price of the element, price of exchange',
        example: 1.99
    })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({
        type: Number,
        description: 'Quantity of cards being sold',
        example: 1.99
    })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}
