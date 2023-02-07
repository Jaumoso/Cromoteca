import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto {

    @ApiProperty({
        type: String, 
        description: 'Street of user residence. Required.',
        example: 'Street, 4'
    })
    @IsString()
    @IsNotEmpty()
    readonly street: string;

    @ApiProperty({
        type: String, 
        description: 'City of user residence. Required.',
        example: 'City'
    })
    @IsString()
    @IsNotEmpty()
    readonly city: string;

    @ApiProperty({
        type: String, 
        description: 'Postal code of user residence. Required.',
        example: "PostalCode-12345"
    })
    @IsNotEmpty()
    @IsString()
    postalCode: string;

    @ApiProperty({
        type: String, 
        description: 'Province of user residence. Required.',
        example: "Province"
    })
    @IsString()
    @IsNotEmpty()
    province: string;

    @ApiProperty({
        type: String, 
        description: 'Country ofuser residence. Required.',
        example: "Country"    
    })
    @IsString()
    @IsNotEmpty()
    country: string;
}