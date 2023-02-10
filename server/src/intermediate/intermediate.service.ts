import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIntermediateDto } from './dto/createIntermediate.dto';
import { UpdateIntermediateDto } from './dto/updateIntermediate.dto';
import { IntermediateDocument } from './schema/intermediate.schema';

@Injectable()
export class IntermediateService {
constructor(@InjectModel('Intermediate') private intermediateModel: Model<IntermediateDocument>) { }

    async getAllIntermediates(): Promise<IntermediateDocument[]> {
        const intermediateData = await this.intermediateModel.find()
        if (!intermediateData || intermediateData.length == 0) {
            throw new NotFoundException('Intermediate data not found!');
        }
        return intermediateData;
    }

    async getIntermediate(intermediateId: string): Promise<IntermediateDocument> {
        const intermediateData = await this.intermediateModel.findById(intermediateId);
        if (!intermediateData) {
            throw new NotFoundException('Intermediate data not found!');
        }
        return intermediateData;
    }

    async createIntermediate(intermediateDto: CreateIntermediateDto): Promise<IntermediateDocument> {
        const intermediateData = await this.intermediateModel.create(intermediateDto);
        if (!intermediateData) {
            throw new NotFoundException('Intermediate data not found!');
        }
        return intermediateData;
    }

    async updateIntermediate(intermediateId: string, intermediateDto: UpdateIntermediateDto): Promise<IntermediateDocument> {
        const intermediateData = await this.intermediateModel.findByIdAndUpdate(intermediateId, intermediateDto);
        if (!intermediateData) {
            throw new NotFoundException('Intermediate data not found!');
        }
        return intermediateData;
    }

    async deleteIntermediate(intermediateId: string): Promise<IntermediateDocument> {
        const intermediateData = await this.intermediateModel.findByIdAndDelete(intermediateId);
        if (!intermediateData) {
            throw new NotFoundException('Intermediate data not found!');
        }
        return intermediateData;
    }

}
