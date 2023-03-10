import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdateAddressDto } from './dto/updateAddress.dto';
import { AddressDocument } from './schema/address.schema';

@Injectable()
export class AddressService {
    constructor(@InjectModel('Address') private addressModel:Model<AddressDocument>) { }

    async getAllAddressess(): Promise<AddressDocument[]> {
        const addressData = await this.addressModel.find()
        if (!addressData || addressData.length == 0) {
            throw new NotFoundException('Address data not found!');
        }
        return addressData;
    }

    async getAddress(addressId: string): Promise<AddressDocument> {
        const addressData = await this.addressModel.findById(addressId);
        if (!addressData) {
            throw new NotFoundException('Address data not found!');
        }
        return addressData;
    }

    async createAddress(addressDto: CreateAddressDto ): Promise<AddressDocument> {
        const newAddress = await this.addressModel.create(addressDto);
        if (!newAddress) {
            throw new NotFoundException('Could not create address!');
        }
        return newAddress;
    }

    async updateAddress(addressId: string, updateAddressDto: UpdateAddressDto) {
        const updatedAddress = await this.addressModel.findByIdAndUpdate(addressId, updateAddressDto);
        if (!updatedAddress) {
            throw new NotFoundException('Address data not found!');
        }
        return updatedAddress;
    }

    async deleteAddress(addressId: string): Promise<AddressDocument> {
        const deletedAddress = await this.addressModel.findByIdAndDelete(addressId);
      if (!deletedAddress) {
        throw new NotFoundException(`Address #${addressId} not found`);
      }
      return deletedAddress;
    }


}
