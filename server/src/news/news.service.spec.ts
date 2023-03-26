import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { NewsService } from './news.service';
import { News, NewsSchema } from './schema/news.schema';

describe('NewsService', () => {
  let service: NewsService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let newsModel: Model<News>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    newsModel = mongoConnection.model(News.name, NewsSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsService, { provide: getModelToken(News.name), useValue: newsModel }],
    }).compile();

    service = module.get(NewsService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get All News', () => {
    it('should return the news from the database', async () => {
      const news = await new newsModel({
        ...{
          title: 'default title',
          newsbody: 'default news body',
          date: new Date,
        },
      }).save();
      const result = await service.getLastNews();
      expect(result.length).toEqual(1);
      expect(result[0].title).toEqual(news.title);
      expect(result[0].newsbody).toEqual(news.newsbody);
      expect(result[0].date).toEqual(news.date);
    });
  });
});
