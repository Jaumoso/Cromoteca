import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdateAddressDto } from './dto/updateAddress.dto';
import { sanitizeFilter } from 'mongoose';

@ApiTags('Address')
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

/*     @Get()
    @ApiCreatedResponse({ description: 'This function will get ALL the ADDRESSESS from the database.' })
    async getAddressess(@Res() response) {
        try {
            const addressData = await this.addressService.getAllAddressess();
            return response.status(HttpStatus.OK).json({
                message: 'All address data found successfully', addressData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    } */

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiCreatedResponse({ description: 'This function will get ONE ADDRESS from the database.' })
    async getAddress(@Res() response, @Param('id') addressId: string) {
        try {
            const addressData = await this.addressService.getAddress(addressId);
            return response.status(HttpStatus.OK).json({
                message: 'Address data found successfully', addressData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Post('new')
    @ApiCreatedResponse({ description: 'Creation of a NEW ADDRESS and insertion in the database.' })
    async createAddress(@Res() response, @Body() createAddressDto: CreateAddressDto) {
        try {
            const newAddress = await this.addressService.createAddress(createAddressDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Address has been created successfully', newAddress,
            });
        }
        catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Address not created!',
                error: 'Bad Request'
            });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiCreatedResponse({ description: 'UPDATE te data of the ADDRESS into the database.' })
    async updateAddress(@Res() response, @Param('id') addressId: string, @Body() updateAddressDto: UpdateAddressDto) {
        try {
            const existingAddress = await this.addressService.updateAddress(addressId, sanitizeFilter(updateAddressDto));
            return response.status(HttpStatus.OK).json({
                message: 'Address has been successfully updated',
                existingAddress,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiCreatedResponse({ description: 'This function will DELETE the Address with the ID passed as parameter from the database.' })
    async deleteAddress(@Res() response, @Param('id') addressId: string) {
        try {
            const deletedAddress = await this.addressService.deleteAddress(addressId);
            return response.status(HttpStatus.OK).json({
                message: 'User deleted successfully',
                deletedAddress,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }


}
