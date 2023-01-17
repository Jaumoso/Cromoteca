import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CollectionService } from './collection.service';

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
}
