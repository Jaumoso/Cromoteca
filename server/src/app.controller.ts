import { Controller, Get} from '@nestjs/common';
import { AppService } from './app.service';
/* import { OAuth2Client } from 'google-auth-library';
import { ApiCreatedResponse } from '@nestjs/swagger'; */


/* const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
 ); */

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

/*   @Post('/login')
  @ApiCreatedResponse({description: 'Google Login'})
  async login(@Body('token') token): Promise<any> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
     // log the ticket payload in the console to see what we have
    console.log(ticket.getPayload());
  } */

  // DEFAULT
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
