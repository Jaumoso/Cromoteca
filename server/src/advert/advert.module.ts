import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdvertController } from './advert.controller';
import { AdvertService } from './advert.service';
import { AdvertSchema } from './schema/advert.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Advert', schema: AdvertSchema }]),],
  controllers: [AdvertController],
  providers: [AdvertService]
})
export class AdvertModule {}
