import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionSchema } from './schema/collection.schema';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Collection', schema: CollectionSchema }]),],
  providers: [CollectionService, JwtStrategy],
  controllers: [CollectionController]
})
export class CollectionModule {}
