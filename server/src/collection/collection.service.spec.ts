import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { CollectionService } from './collection.service';
import { Collection, CollectionSchema } from './schema/collection.schema';
import { CreateCollectionDto } from './dto/createCollection.dto';
import { UpdateCollectionDto } from './dto/updateCollection.dto';
import { CollectionDtoStub } from './dto/collection.dto.stub';
import { NotFoundException } from '@nestjs/common';

describe('CollectionService', () => {
  let service: CollectionService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let collectionModel: Model<Collection>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    collectionModel = mongoConnection.model(Collection.name, CollectionSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionService, { provide: getModelToken(Collection.name), useValue: collectionModel }],
    }).compile();

    service = module.get(CollectionService);
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

  describe('Get All Collections', () => {
    it('should return the collectioness from the database', async () => {
      await new collectionModel({
        ...{
          name: 'default name',
          description: 'default description',
          format: 'default format',
          theme: 'default theme',
          size: '10',
          year: 2000,
          publisher: 'default publisher',
          language: 'default language',
          image: 'https://default_image.jpg',
        },
        ... CollectionDtoStub(),
      }).save();
      const result = await service.getAllCollections();
      expect(result.length).toEqual(1);
    });
  });

  describe('Get Collection', () => {
    it('should return the collection from the database', async () => {
      const collection = await new collectionModel({
        ...{
          name: 'default name',
          description: 'default description',
          format: 'default format',
          theme: 'default theme',
          size: '10',
          year: 2000,
          publisher: 'default publisher',
          language: 'default language',
          image: 'https://default_image.jpg',
        },
        ... CollectionDtoStub(),
      }).save();
      const result = await service.getCollection(collection._id.toString());
      expect(result.name).toEqual(collection.name);
      expect(result.description).toEqual(collection.description);
      expect(result.format).toEqual(collection.format);
      expect(result.theme).toEqual(collection.theme);
      expect(result.size).toEqual(collection.size);
      expect(result.year).toEqual(collection.year);
      expect(result.publisher).toEqual(collection.publisher);
      expect(result.language).toEqual(collection.language);
      expect(result.image).toEqual(collection.image);
    });
  });

  describe('Create Collection', () => {
    it('should create new collection in database', async () => {
      const collection: CreateCollectionDto = new CreateCollectionDto()
      collection.name = 'default name';
      collection.description = 'default description';
      collection.format = 'default format';
      collection.theme = 'default theme';
      collection.size = 10;
      collection.year = 2000;
      collection.publisher = 'default publisher';
      collection.language = 'default language';
      collection.image = 'default image';

      const result = await service.createCollection(collection);
      expect(result.name).toEqual(collection.name);
      expect(result.description).toEqual(collection.description);
      expect(result.format).toEqual(collection.format);
      expect(result.theme).toEqual(collection.theme);
      expect(result.size).toEqual(collection.size);
      expect(result.year).toEqual(collection.year);
      expect(result.publisher).toEqual(collection.publisher);
      expect(result.language).toEqual(collection.language);
      expect(result.image).toEqual(collection.image);
    });
  });

  describe('Update Collection', () => {
    it('should return the modified collection', async () => {
      const collectionObject: UpdateCollectionDto = new UpdateCollectionDto();
      collectionObject.name = 'updated name';
      collectionObject.description = 'updated description';
      collectionObject.format = 'updated format';
      collectionObject.theme = 'updated theme';
      collectionObject.size = 20;
      collectionObject.year = 2023;
      collectionObject.publisher = 'updated publisher';
      collectionObject.language = 'updated language';
      collectionObject.image = 'updated image';

      const collection = await new collectionModel({
        ...{
          name: 'default name',
          description: 'default description',
          format: 'default format',
          theme: 'default theme',
          size: '10',
          year: 2000,
          publisher: 'default publisher',
          language: 'default language',
          image: 'https://default_image.jpg',
        },
        ...CollectionDtoStub(),
      }).save();
      const untouchedCollection = await service.updateCollection(collection._id.toString(), collectionObject);
      const updatedCollection = await service.getCollection(collection._id.toString());
      expect(untouchedCollection.name).toEqual(collection.name);
      expect(untouchedCollection.description).toEqual(collection.description);
      expect(untouchedCollection.format).toEqual(collection.format);
      expect(untouchedCollection.theme).toEqual(collection.theme);
      expect(untouchedCollection.size).toEqual(collection.size);
      expect(untouchedCollection.year).toEqual(collection.year);
      expect(untouchedCollection.publisher).toEqual(collection.publisher);
      expect(untouchedCollection.language).toEqual(collection.language);
      expect(untouchedCollection.image).toEqual(collection.image);

      expect(updatedCollection.name).toEqual(collectionObject.name);
      expect(updatedCollection.description).toEqual(collectionObject.description);
      expect(updatedCollection.format).toEqual(collectionObject.format);
      expect(updatedCollection.theme).toEqual(collectionObject.theme);
      expect(updatedCollection.size).toEqual(collectionObject.size);
      expect(updatedCollection.year).toEqual(collectionObject.year);
      expect(updatedCollection.publisher).toEqual(collectionObject.publisher);
      expect(updatedCollection.language).toEqual(collectionObject.language);
      expect(updatedCollection.image).toEqual(collectionObject.image);

    });
  });


  describe('Delete Collection', () => {
    it('should return the Deleted Collection', async () => {
      const collection = await new collectionModel({
        ...{
          name: 'default name',
          description: 'default description',
          format: 'default format',
          theme: 'default theme',
          size: '10',
          year: 2000,
          publisher: 'default publisher',
          language: 'default language',
          image: 'https://default_image.jpg',
        },
        ...CollectionDtoStub(), 
      }).save();
    // Delete the collection
    const result1 = await service.deleteCollection(collection._id.toString());
    expect(result1).not.toEqual(null);

    // Try to delete the collection again and expect a NotFoundException
    try {
      const result2 = await service.deleteCollection(collection._id.toString());
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
    });
  });

});
