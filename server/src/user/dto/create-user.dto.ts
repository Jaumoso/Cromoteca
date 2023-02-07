import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import mongoose from "mongoose";
export class CreateUserDto {

    @ApiProperty({
        type: String, 
        description: 'Email of the user. Required.',
        example: 'example@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

/*     @IsStrongPassword() */
    @IsString()
    @ApiProperty({
        type: String, 
        description: 'Contraseña del usuario. Este campo es obligatorio.',
        example: 't(Esvx@Ggn*k?[M'
    })
    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        type: String, 
        description: 'Nickname del usuario. Este campo es obligatorio.',
        example: "nombre por defecto"
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    username: string;

    @ApiProperty({
        type: String, 
        description: 'Nombre del usuario. Este campo es obligatorio.',
        example: "nombre por defecto"
    })
    @IsString()
    @MaxLength(35)
    @MinLength(2)
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        type: String, 
        description: 'Apellidos del usuario. Este campo es obligatorio.',
        example: "apellidos por defecto"    
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    lastName: string;

    @ApiProperty({
        type: Date, 
        description: 'Fecha de alta del usuario. Este campo se genera automáticamente.',
        example: new Date(2023, 1, 15).toISOString()
    })
    @IsString()
    @IsNotEmpty()
    entryDate: Date;

    @ApiProperty({
        type: Boolean, 
        description: 'Tipo de usuario. Por defecto "false" - usuario sin privilegios.',
        example: false
    })
    @IsBoolean()
    @IsNotEmpty()
    admin: Boolean;


    @ApiProperty({ 
        type: mongoose.Types.ObjectId, 
        description: 'Array of type: ObjectId. Relation 1 user to many accounts.',
        example: new mongoose.Types.ObjectId()
    })
    addressId: mongoose.Types.ObjectId;
}