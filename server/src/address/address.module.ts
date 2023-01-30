import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressSchema } from './schema/address.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }]),],
  providers: [AddressService, JwtStrategy],
  controllers: [AddressController],
})
export class AddressModule {}
