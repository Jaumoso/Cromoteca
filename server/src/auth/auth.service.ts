import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findUser(username);
        if (!user) {
            throw new NotAcceptableException('No se ha podido encontrar el usuario');
        }

        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid) {
            
        }
        // Devuelve el usuario sin username, password ni email
        if (passwordValid) {
            const { password, username, email, ... rest } = user;
            return rest;
        }
        else{
            throw new NotAcceptableException('La contraseña no es válida');
        }
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
                expiresIn: '120m' // duración de la sesión. Cada 2 horas se necesita iniciar sesión de nuevo
            })
        };
    }
}