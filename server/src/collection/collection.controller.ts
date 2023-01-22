import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Body, Delete, Param, Post, Put } from '@nestjs/common/decorators';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/createCollection.dto';
import { UpdateCollectionDto } from './dto/updateCollection.dto';

@ApiTags('collection')
@Controller('collection')
export class CollectionController {
    constructor(private readonly collectionService: CollectionService) { }

    @Get()
    @ApiCreatedResponse({ description: 'This function will get ALL the COLLECTIONS from the database.' })
    async getCollections(@Res() response) {
        try {
            const collectionData = await this.collectionService.getAllCollections();
            return response.status(HttpStatus.OK).json({
                message: 'All collection data found successfully', collectionData: collectionData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get(':id')
    @ApiCreatedResponse({ description: 'This function will get the COLLECTION data from the collection with id passed as a parameter from the database.' })
    async getCollection(@Res() response, @Param('id') collectionId: string) {
        try {
            const collectionData = await this.collectionService.getCollection(collectionId);
            return response.status(HttpStatus.OK).json({
                message: 'Collection data found successfully', collectionData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    // FUNCIONES PARA ADMINISTRADOR
    @Post('new')
    @ApiCreatedResponse({ description: 'Creation of a NEW COLLECTION and insertion in the database.' })
    async createUser(@Res() response, @Body() collectionDto: CreateCollectionDto) {
        try {
            const newUser = await this.collectionService.createCollection(collectionDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Collection has been created successfully',
                newUser,
            });
        }
        catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Collection not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('/:id')
    @ApiCreatedResponse({ description: 'UPDATE te data of the COLLECTION into the database.' })
    async updateUser(@Res() response, @Param('id') collectionId: string, @Body() updateCollectionDto: UpdateCollectionDto) {
        try {
            const existingUser = await this.collectionService.updateCollection(collectionId, updateCollectionDto);
            return response.status(HttpStatus.OK).json({
                message: 'Collection has been successfully updated',
                existingUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('delete/:id')
    @ApiCreatedResponse({ description: 'This function will DELETE the COLLECTION passed as parameter from the database.' })
    async deleteUser(@Res() response, @Param('id') collectionId: string) {
        try {
            const deletedUser = await this.collectionService.deleteCollection(collectionId);
            return response.status(HttpStatus.OK).json({
                message: 'Collection deleted successfully',
                deletedUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
