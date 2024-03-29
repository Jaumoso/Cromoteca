import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString} from 'class-validator';
import mongoose from 'mongoose';

export class CreateCardDto {
  @ApiProperty({
    type: mongoose.Types.ObjectId,
    description: 'User ID. Requerido.',
    example: new mongoose.Types.ObjectId
  })
  @IsNotEmpty()
  userId: mongoose.Types.ObjectId;

  @ApiProperty({
    type: mongoose.Types.ObjectId,
    description: 'Collection ID. Requerido.',
    example: new mongoose.Types.ObjectId
  })
  @IsNotEmpty()
  collectionId: mongoose.Types.ObjectId;

  @ApiProperty({
    type: Number,
    description: 'Id del cromo.',
    example: 1
  })
  @IsNotEmpty()
  @IsNumber()
  cardId: number;

  @ApiProperty({
    type: String,
    description: 'Nombre del cromo.',
    example: 'Nombre del cromo'
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Cantidad de veces repetido (cromo)',
    example: 1
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    type: String,
    description: 'Descripción del cromo.',
    example: 'Descripción del cromo (o anuncio)'
  })
  @IsString()
  description: string;

/*   @ApiProperty({
    type: String,
    description: 'Imagen del cromo.',
    example: 'C:/fldkfldkfd'
  })
  @IsNotEmpty()
  @IsString()
  image: string; */

  @ApiProperty({
    type: String,
    description: 'Estado del cromo.',
    example: 'NUEVO'
  })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({
    type: Number,
    description: 'Precio del cromo (si está en venta)',
    example: 3.99
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}