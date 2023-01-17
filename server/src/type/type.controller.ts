import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { TypeService } from './type.service';

@ApiTags('Type')
@Controller('type')
export class TypeController {
    constructor(private readonly typeService: TypeService) { }

    @Get()
    @ApiCreatedResponse({ description: 'This function will get ALL the TYPES from the database.' })
    async getUsers(@Res() response) {
        try {
            const typeData = await this.typeService.getAllTypes();
            return response.status(HttpStatus.OK).json({
                message: 'All types data found successfully', typeData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get(':id')
    @ApiCreatedResponse({ description: 'This function will get the TYPE data from the collection with id passed as a parameter from the database.' })
    async getCollection(@Res() response, @Param('id') typeId: string) {
        try {
            const typeData = await this.typeService.getType(typeId);
            return response.status(HttpStatus.OK).json({
                message: 'Collection data found successfully', typeData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
