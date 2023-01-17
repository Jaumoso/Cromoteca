import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressSchema } from './schema/address.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }]),],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
