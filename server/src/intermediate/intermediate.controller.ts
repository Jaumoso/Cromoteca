import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Body, Delete, Param, Post, Put, UseGuards } from '@nestjs/common/decorators';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateIntermediateDto } from './dto/createIntermediate.dto';
import { UpdateIntermediateDto } from './dto/updateIntermediate.dto';
import { IntermediateService } from './intermediate.service';

@ApiTags('intermediate')
@Controller('intermediate')
export class IntermediateController {
    constructor(private readonly intermediateService: IntermediateService) { }

/*     @Get()
    @ApiCreatedResponse({ description: 'This function will get ALL the INTERMEDIATES from the database.' })
    async getIntermediates(@Res() response) {
        try {
            const intermediateData = await this.intermediateService.getAllIntermediates();
            return response.status(HttpStatus.OK).json({
                message: 'All intermediates data found successfully', intermediateData: intermediateData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    } */

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiCreatedResponse({ description: 'This function will get the INTERMEDIATE data from the intermediate with id passed as a parameter from the database.' })
    async getIntermediate(@Res() response, @Param('id') intermediateId: string) {
        try {
            const intermediateData = await this.intermediateService.getIntermediate(intermediateId);
            return response.status(HttpStatus.OK).json({
                message: 'Intermediate data found successfully', intermediateData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/user/:id')
    @ApiCreatedResponse({ description: 'This function will get the COLLECTIONS from the USERs LIBRARY with id passed as a parameter from the database.' })
    async getUserIntermediate(@Res() response, @Param('id') userId: string) {
        try {
            const intermediateData = await this.intermediateService.getUserIntermediate(userId);
            return response.status(HttpStatus.OK).json({
                message: 'Intermediate data found successfully', intermediateData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    
    @Post('new')
    @ApiCreatedResponse({ description: 'Creation of a NEW INTERMEDIATE and insertion in the database.' })
    async createIntermediate(@Res() response, @Body() intermediateDto: CreateIntermediateDto) {
        try {
            const newIntermediate = await this.intermediateService.createIntermediate(intermediateDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Intermediate has been created successfully',
                newIntermediate,
            });
        }
        catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Intermediate not created!',
                error: 'Bad Request'
            });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiCreatedResponse({ description: 'UPDATE te data of the INTERMEDIATE into the database.' })
    async updateIntermediate(@Res() response, @Param('id') intermediateId: string, @Body() updateIntermediateDto: UpdateIntermediateDto) {
        try {
            const updatedIntermediate = await this.intermediateService.updateIntermediate(intermediateId, updateIntermediateDto);
            return response.status(HttpStatus.OK).json({
                message: 'Intermediate has been successfully updated',
                updatedIntermediate,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiCreatedResponse({ description: 'This function will DELETE the INTERMEDIATE passed as parameter from the database.' })
    async deleteIntermediate(@Res() response, @Param('id') intermediateId: string) {
        try {
            const deletedIntermediate = await this.intermediateService.deleteIntermediate(intermediateId);
            return response.status(HttpStatus.OK).json({
                message: 'Intermediate deleted successfully',
                deletedIntermediate,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('deleteuser/:id')
    @ApiCreatedResponse({ description: 'This function will DELETE the INTERMEDIATE passed as parameter from the database.' })
    async deleteUserIntermediate(@Res() response, @Param('id') userId: string) {
        try {
            const deletedIntermediate = await this.intermediateService.deleteUserIntermediate(userId);
            return response.status(HttpStatus.OK).json({
                message: 'Intermediate deleted successfully',
                deletedIntermediate,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
