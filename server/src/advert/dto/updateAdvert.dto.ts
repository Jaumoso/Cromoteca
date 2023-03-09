import { PartialType } from '@nestjs/swagger';
import { CreateAdvertDto } from './createAdvert.dto';
export class UpdateAdvertDto extends PartialType(CreateAdvertDto) {}