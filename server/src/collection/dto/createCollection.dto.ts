import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCollectionDto {
  @ApiProperty({
    type: String,
    description: 'Nombre de la colección. Requerido.',
    example: 'Nombre de Colección'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Descripción de la colección. Requerido.',
    example: 'Descripción de la colección'
  })
  @IsString()
  description: string;

  @ApiProperty({ 
    type: String,
    description: 'Formato de la colección. Requerido.'
   })
   format: string;

   @ApiProperty({ 
    type: String,
    description: 'Tema de la colección. Requerido.'
   })
   theme: string;

   @ApiProperty({ 
    type: Number,
    description: 'Tamaño de la colección, en numero de objetos que la integran.',
    example: 0
   })
   size: number;

  @ApiProperty({
    type: Number,
    description: 'Año de lanzamiento de la colección. Requerido.',
    example: 2000
  })
  @IsNumber()
  year: number;

  @ApiProperty({ 
    type: String, 
    description: 'Editora de la colección. Requerido.',
    example: 'Editora de la colección',
  })
  @IsNotEmpty()
  publisher: string;

  
  @ApiProperty({ 
    type: String, 
    description: 'Idioma de la colección. Requerido.',
    example: 'Español',
  })
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty({
    type: String,
    description: 'Imagen de portada de la colección. Requerido.',
    example: 'http://url-to-image.jpg'
  })
  @IsString()
  @IsNotEmpty()
  image: string;
}