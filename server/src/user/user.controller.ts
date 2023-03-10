import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";


@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @ApiCreatedResponse({ description: 'This function will get ALL the USERS from the database.' })
    async getUsers(@Res() response) {
        try {
            const userData = await this.userService.getAllUsers();
            return response.status(HttpStatus.OK).json({
                message: 'All users data found successfully', userData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get(':id')
    @ApiCreatedResponse({ description: 'This function will get ONE USER INFO from the database.' })
    async getUser(@Res() response, @Param('id') userId: string) {
        try {
            const userData = await this.userService.getUser(userId);
            return response.status(HttpStatus.OK).json({
                message: 'User data found successfully', userData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('checkemail/:id')
    @ApiCreatedResponse({ description: 'This function will get ONE USER INFO from the database.' })
    async checkEmail(@Res() response, @Param('id') email: string) {
        try {
            const userData = await this.userService.checkEmail(email);
            return response.status(HttpStatus.OK).json({
                message: 'User data found successfully', userData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('checkexistinguser/:id1/:id2')
    @ApiCreatedResponse({ description: 'This function will get ONE USER INFO from the database.' })
    async checkExistingUser(@Res() response, @Param('id1') username: string, @Param('id2') email: string) {
        try {
            const userData = await this.userService.checkExistingUser(username, email);
            return response.status(HttpStatus.OK).json({
                message: 'User data found successfully', userData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Post('new')
    @ApiCreatedResponse({ description: 'Creation of a NEW USER and insertion in the database.' })
    async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
        try {
            const newUser = await this.userService.createUser(createUserDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'User has been created successfully', newUser,
            });
        }
        catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('update/:id')
    @ApiCreatedResponse({ description: 'UPDATE te data of the USER into the database.' })
    async updateUser(@Res() response, @Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
        try {
            const existingUser = await this.userService.updateUser(userId, updateUserDto);
            return response.status(HttpStatus.OK).json({
                message: 'User has been successfully updated',
                existingUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('delete/:id')
    @ApiCreatedResponse({ description: 'This function will DELETE the USER with the ID passed as parameter from the database.' })
    async deleteUser(@Res() response, @Param('id') userId: string) {
        try {
            const deletedUser = await this.userService.deleteUser(userId);
            return response.status(HttpStatus.OK).json({
                message: 'User deleted successfully',
                deletedUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

}
