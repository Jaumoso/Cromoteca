import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdvertDto } from './dto/createAdvert.dto';
import { UpdateAdvertDto } from './dto/updateAdvert.dto';
import { AdvertDocument } from './schema/advert.schema';

@Injectable()
export class AdvertService {
    constructor(@InjectModel('Advert') private advertModel:Model<AdvertDocument>) { }

    async getAllAdverts(): Promise<AdvertDocument[]> {
        const advertData = await this.advertModel.find()
        if (!advertData || advertData.length == 0) {
            throw new NotFoundException('Advert data not found!');
        }
        return advertData;
    }

    async getAdvert(advertId: string): Promise<AdvertDocument> {
        const advertData = await this.advertModel.findById(advertId);
        if (!advertData) {
            throw new NotFoundException('Advert data not found!');
        }
        return advertData;
    }

    async getUserAdverts(userId: string): Promise<AdvertDocument[]> {
        const advertData = await this.advertModel.find({ userId: userId})
        if (!advertData) {
            throw new NotFoundException('Advert data not found!');
        }
        return advertData;
    }

    async getAdvertByCard(cardId: string): Promise<AdvertDocument> {
        const advertData = await this.advertModel.findOne({ elementId: cardId})
        if (!advertData) {
            throw new NotFoundException('Advert data not found!');
        }
        return advertData;
    }

    async checkExistingAdvert(elementId: string): Promise<AdvertDocument[]> {
        const advertData = await this.advertModel.find({ elementId: elementId });
        if (!advertData) {
            throw new NotFoundException('Advert data not found!');
        }
        return advertData;
    }

    async createAdvert(advertDto: CreateAdvertDto ): Promise<AdvertDocument> {
        const newAdvert = await this.advertModel.create(advertDto);
        if (!newAdvert) {
            throw new NotFoundException('Could not create advert!');
        }
        return newAdvert;
    }

    async updateAdvert(advertId: string, updateAdvertDto: UpdateAdvertDto) {
        const updatedAdvert = await this.advertModel.findByIdAndUpdate(advertId, updateAdvertDto);
        if (!updatedAdvert) {
            throw new NotFoundException('Advert data not found!');
        }
        return updatedAdvert;
    }

    async deleteAdvert(advertId: string): Promise<AdvertDocument> {
        const deletedAdvert = await this.advertModel.findByIdAndDelete(advertId);
      if (!deletedAdvert) {
        throw new NotFoundException(`Advert #${advertId} not found`);
      }
      return deletedAdvert;
    }

    async deleteAdvertCard(cardId: string): Promise<AdvertDocument> {
        const deletedAdvert = await this.advertModel.findOneAndDelete({cardId: cardId});
      if (!deletedAdvert) {
        throw new NotFoundException(`Advert of element #${cardId} not found`);
      }
      return deletedAdvert;
    }
}
