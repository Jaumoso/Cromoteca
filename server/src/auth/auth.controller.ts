import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { Get } from '@nestjs/common/decorators';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @ApiCreatedResponse({ description: 'Función de LOGIN' })
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user._doc);
    }

    @UseGuards(JwtAuthGuard)
    @Get('protected')
    gethello(@Request() req): string {
        return req.user;
    }
}