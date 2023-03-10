import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IntermediateController } from './intermediate.controller';
import { IntermediateService } from './intermediate.service';
import { IntermediateSchema } from './schema/intermediate.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Intermediate', schema: IntermediateSchema }]),],
  controllers: [IntermediateController],
  providers: [IntermediateService]
})
export class IntermediateModule {}
