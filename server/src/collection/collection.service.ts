import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCollectionDto } from './dto/createCollection.dto';
import { UpdateCollectionDto } from './dto/updateCollection.dto';
import { ICollection } from './interface/collection.interface';

@Injectable()
export class CollectionService {
    constructor(@InjectModel('Collection') private collectionModel: Model<ICollection>) { }

    async getAllCollections(): Promise<ICollection[]> {
        const collectionData = await this.collectionModel.find()
        if (!collectionData || collectionData.length == 0) {
            throw new NotFoundException('Collection data not found!');
        }
        return collectionData;
    }

    async getCollection(collectionId: string): Promise<ICollection> {
        const collectionData = await this.collectionModel.findById(collectionId);
        if (!collectionData) {
            throw new NotFoundException('Collection data not found!');
        }
        return collectionData;
    }

    // NO NECESITO createCollection
    // NO NECESITO updateCollection
    // NO NECESITO deleteCollection

    async createCollection(collectionDto: CreateCollectionDto): Promise<ICollection> {
        const collectionData = await this.collectionModel.create(collectionDto);
        if (!collectionData) {
            throw new NotFoundException('Collection could not be created!');
        }
        return collectionData;
    }

    async updateCollection(collectionId: string, updateCollectionDto: UpdateCollectionDto): Promise<ICollection> {
        const collectionData = await this.collectionModel.findByIdAndUpdate(collectionId, updateCollectionDto);
        if (!collectionData) {
            throw new NotFoundException('Collection could not be updated!');
        }
        return collectionData;
    }

    async deleteCollection(collectionId: string): Promise<ICollection> {
        const collectionData = await this.collectionModel.findByIdAndDelete(collectionId);
        if (!collectionData) {
            throw new NotFoundException('Collection could not be deleted!');
        }
        return collectionData;
    }

}
