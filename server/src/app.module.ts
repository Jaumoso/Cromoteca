import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from './address/address.module';
import { CollectionModule } from './collection/collection.module';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { IntermediateModule } from './intermediate/intermediate.module';
import { CardModule } from './card/card.module';
import { AdvertModule } from './advert/advert.module';

require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@cromoteca.raohzgx.mongodb.net/test',{dbName: 'Cromoteca'}),
    UserModule,
    AddressModule,
    CollectionModule,
    NewsModule,
    AuthModule,
    IntermediateModule,
    CardModule,
    AdvertModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
