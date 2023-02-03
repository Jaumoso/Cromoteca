import { Module } from "@nestjs/common"
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from "../user/user.service";
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "../user/schema/user.schema"
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from "./jwt.strategy";


@Module({
  imports: [
    UserModule, 
    PassportModule,
    JwtModule, 
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }
  ])
  ],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }