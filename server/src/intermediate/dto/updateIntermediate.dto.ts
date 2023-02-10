import { PartialType } from '@nestjs/swagger';
import { CreateIntermediateDto } from './createIntermediate.dto';

export class UpdateIntermediateDto extends PartialType(CreateIntermediateDto) {}