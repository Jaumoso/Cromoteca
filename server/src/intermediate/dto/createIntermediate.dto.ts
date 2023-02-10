import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateIntermediateDto {
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
    example: [new mongoose.Types.ObjectId]
  })
  @IsNotEmpty()
  collectionId: mongoose.Types.ObjectId[];
}