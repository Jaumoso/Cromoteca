import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IType } from './interface/type.interface';

@Injectable()
export class TypeService {

    constructor(@InjectModel('Type') private typeModel: Model<IType>) { }

    async getAllTypes(): Promise<IType[]> {
        const typeData = await this.typeModel.find()
        if (!typeData || typeData.length == 0) {
            throw new NotFoundException('Type data not found!');
        }
        return typeData;
    }

    async getType(typeId: string): Promise<IType> {
        const typeData = await this.typeModel.findById(typeId);
        if (!typeData) {
            throw new NotFoundException('Type data not found!');
        }
        return typeData;
    }

    // NO NECESITO createType
    // NO NECESITO updateType
    // NO NECESITO deleteType
}
