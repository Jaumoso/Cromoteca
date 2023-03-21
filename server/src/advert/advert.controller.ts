import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdvertService } from './advert.service';
import { CreateAdvertDto } from './dto/createAdvert.dto';
import { UpdateAdvertDto } from './dto/updateAdvert.dto';

@ApiTags('Advert')
@Controller('advert')
export class AdvertController {
    constructor(private readonly advertService: AdvertService) { }

    @Get()
    @ApiCreatedResponse({ description: 'This function will get ALL the ADVERTS from the database.' })
    async getAllAdverts(@Res() response) {
        try {
            const advertData = await this.advertService.getAllAdverts();
            return response.status(HttpStatus.OK).json({
                message: 'All advert data found successfully', advertData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    /* @UseGuards(JwtAuthGuard) */
    @Get(':id')
    @ApiCreatedResponse({ description: 'This function will get ONE ADVERT from the database.' })
    async getAdvert(@Res() response, @Param('id') advertId: string) {
        try {
            const advertData = await this.advertService.getAdvert(advertId);
            return response.status(HttpStatus.OK).json({
                message: 'Advert data found successfully', advertData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('user/:id')
    @ApiCreatedResponse({ description: 'This function will get ONE ADVERT from the database.' })
    async getUserAdverts(@Res() response, @Param('id') userId: string) {
        try {
            const advertData = await this.advertService.getUserAdverts(userId);
            return response.status(HttpStatus.OK).json({
                message: 'Advert data found successfully', advertData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('user/:cardId')
    @ApiCreatedResponse({ description: 'This function will get ONE ADVERT from the database.' })
    async getAdvertByCard(@Res() response, @Param('id') cardId: string) {
        try {
            const advertData = await this.advertService.getAdvertByCard(cardId);
            return response.status(HttpStatus.OK).json({
                message: 'Advert data found successfully', advertData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('checkadvert/:elementId')
    @ApiCreatedResponse({ description: 'This function will get ONE ADVERT from the database.' })
    async checkExistingAdvert(@Res() response, @Param('elementId') elementId: string) {
        try {
            const advertData = await this.advertService.checkExistingAdvert(elementId);
            return response.status(HttpStatus.OK).json({
                message: 'Advert data found successfully', advertData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Post('new')
    @ApiCreatedResponse({ description: 'Creation of a NEW ADDRESS and insertion in the database.' })
    async createAdvert(@Res() response, @Body() createAdvertDto: CreateAdvertDto) {
        console.log(createAdvertDto);
        try {
            const newAdvert = await this.advertService.createAdvert(createAdvertDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Advert has been created successfully', newAdvert,
            });
        }
        catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Advert not created!',
                error: 'Bad Request'
            });
        }
    }

    /* @UseGuards(JwtAuthGuard) */
    @Put('update/:id')
    @ApiCreatedResponse({ description: 'UPDATE te data of the ADDRESS into the database.' })
    async updateAdvert(@Res() response, @Param('id') aadvertId: string, @Body() updateAdvertDto: UpdateAdvertDto) {
        try {
            const existingAdvert = await this.advertService.updateAdvert(aadvertId, updateAdvertDto);
            return response.status(HttpStatus.OK).json({
                message: 'Advert has been successfully updated',
                existingAdvert,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    
    @Delete('delete/:id')
    @ApiCreatedResponse({ description: 'This function will DELETE the Advert with the ID passed as parameter from the database.' })
    async deleteAdvert(@Res() response, @Param('id') advertId: string) {
        try {
            const deletedAdvert = await this.advertService.deleteAdvert(advertId);
            return response.status(HttpStatus.OK).json({
                message: 'Advert deleted successfully',
                deletedAdvert,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('deletecard/:id')
    @ApiCreatedResponse({ description: 'This function will DELETE the Advert with the ID passed as parameter from the database.' })
    async deleteAdvertCard(@Res() response, @Param('id') cardId: string) {
        try {
            const deletedAdvert = await this.advertService.deleteAdvertCard(cardId);
            return response.status(HttpStatus.OK).json({
                message: 'Advert deleted successfully',
                deletedAdvert,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

}
