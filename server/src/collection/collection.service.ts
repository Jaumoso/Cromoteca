import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCollectionDto } from './dto/createCollection.dto';
import { UpdateCollectionDto } from './dto/updateCollection.dto';
import { CollectionDocument } from './schema/collection.schema';

@Injectable()
export class CollectionService {
    constructor(@InjectModel('Collection') private collectionModel: Model<CollectionDocument>) { }

    async getAllCollections(): Promise<CollectionDocument[]> {
        const collectionData = await this.collectionModel.find()
        if (!collectionData || collectionData.length == 0) {
            throw new NotFoundException('Collection data not found!');
        }
        return collectionData;
    }

    async getCollection(collectionId: string): Promise<CollectionDocument> {
        const collectionData = await this.collectionModel.findById(collectionId);
        if (!collectionData) {
            throw new NotFoundException('Collection data not found!');
        }
        return collectionData;
    }

    // ADMIN METHODS
    async createCollection(collectionDto: CreateCollectionDto): Promise<CollectionDocument> {
        const collectionData = await this.collectionModel.create(collectionDto);
        if (!collectionData) {
            throw new NotFoundException('Collection could not be created!');
        }
        return collectionData;
    }

    async updateCollection(collectionId: string, updateCollectionDto: UpdateCollectionDto): Promise<CollectionDocument> {
        const collectionData = await this.collectionModel.findByIdAndUpdate(collectionId, updateCollectionDto);
        if (!collectionData) {
            throw new NotFoundException('Collection could not be updated!');
        }
        return collectionData;
    }

    async deleteCollection(collectionId: string): Promise<CollectionDocument> {
        const collectionData = await this.collectionModel.findByIdAndDelete(collectionId);
        if (!collectionData) {
            throw new NotFoundException('Collection could not be deleted!');
        }
        return collectionData;
    }

}
