import { PartialType } from '@nestjs/swagger';
import { CreateCollectionDto } from './createCollection.dto';

export class UpdateCollectionDto extends PartialType(CreateCollectionDto) {}