import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INews } from './interface/news.interface';

@Injectable()
export class NewsService {

    constructor(@InjectModel('News') private newsModel:Model<INews>) { }

    async getLastNews(): Promise<INews[]> {
      const newsData = await this.newsModel.find().sort({ date : -1 }).limit(3);
      if (!newsData || newsData.length == 0) {
          throw new NotFoundException('News data not found!');
      }
      return newsData;
    }
}
