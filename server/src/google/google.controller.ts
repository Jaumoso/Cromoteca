import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GoogleService } from './google.service';

@ApiTags('GoogleAuth')
@Controller('google')
export class GoogleController {

    constructor(private googleService: GoogleService) {}

    @Get()
    @UseGuards(AuthGuard('google'))
    @ApiCreatedResponse({description: 'Google Authentication'})
    async googleAuth(@Req() req) {}
  
    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    @ApiCreatedResponse({description: 'Google Redirect'})
    googleAuthRedirect(@Req() req) {
      console.log(req.user)
      /* console.log(req) */
      return this.googleService.googleLogin(req);
    }
}