import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

require('dotenv').config();

import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from './address/address.module';
import { CollectionModule } from './collection/collection.module';
import { TypeModule } from './type/type.module';
@Module({
  imports: [
    /* MongooseModule.forRoot( process.env.MONGO_CONNECTION_STRING ,{dbName: 'Cromoteca'}), */
    MongooseModule.forRoot('mongodb+srv://jaumoso:7iZuK4Xue9fWHlVh@cromoteca.raohzgx.mongodb.net/test',{dbName: 'Cromoteca'}),
    UserModule,
    AddressModule,
    CollectionModule,
    /* TypeModule */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
