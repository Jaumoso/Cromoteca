import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findUser(username);
        /* if (!user) return null; */
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('No se ha podido encontrar el usuario');
        }
/*         if (user && passwordValid) {
            return user;
        } */
        // ! Devuelve el usuario sin username, password ni email, por seguridad.
        if (user && passwordValid) {
            const { password, username, email, ... rest } = user;
            return rest;
        }
        return null;
    }

    async login(user: any) {
        const payload = { 
            _id: user._id,
            email: user.email,
            password: user.password,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            entryDate: user.entryDate,
            admin: user.admin,
            addressId: user.addressId
        };
        return {
            access_token: this.jwtService.sign(payload, {
                algorithm: 'HS256',
                secret: process.env.JWT_SECRET,
                expiresIn: '120m'
            })
        };
    }
}