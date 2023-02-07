import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewsDocument } from './schema/news.schema';

@Injectable()
export class NewsService {

    constructor(@InjectModel('News') private newsModel:Model<NewsDocument>) { }

    async getLastNews(): Promise<NewsDocument[]> {
      const newsData = await this.newsModel.find().sort({ date : -1 }).limit(3);
      if (!newsData || newsData.length == 0) {
          throw new NotFoundException('News data not found!');
      }
      return newsData;
    }
}
