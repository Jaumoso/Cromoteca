import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Connection, Model, connect } from 'mongoose';
import { AdvertService } from './advert.service';
import { Advert, AdvertSchema } from './schema/advert.schema';
import { CreateAdvertDto } from './dto/createAdvert.dto';
import { UpdateAdvertDto } from './dto/updateAdvert.dto';
import { AdvertDtoStub } from './dto/advert.dto.stub';
import { NotFoundException } from '@nestjs/common';

describe('AdvertService', () => {
  let service: AdvertService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let advertModel: Model<Advert>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    advertModel = mongoConnection.model(Advert.name, AdvertSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvertService, { provide: getModelToken(Advert.name), useValue: advertModel }],
    }).compile();

    service = module.get(AdvertService);
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

  describe('Get All Adverts', () => {
    it('should return the adverts from the database', async () => {
      await new advertModel({
        ...{
          elementId: new mongoose.Types.ObjectId,
          userId: new mongoose.Types.ObjectId,
          state: 'NUEVO',
          price: 3.5,
          quantity: 2
        },
        ... AdvertDtoStub(),
      }).save();
      const result = await service.getAllAdverts();
      expect(result.length).toBe(1);
    });
  });

  describe('Get Advert', () => {
    it('should return the advert from the database', async () => {
      const advert = await new advertModel({
        ...{
          elementId: new mongoose.Types.ObjectId,
          userId: new mongoose.Types.ObjectId,
          state: 'NUEVO',
          price: 3.5,
          quantity: 2
        },
        ... AdvertDtoStub(),
      }).save();
      const result = await service.getAdvert(advert._id.toString());
      expect(result.elementId).toEqual(advert.elementId);
      expect(result.userId).toEqual(advert.userId);
      expect(result.state).toEqual(advert.state);
      expect(result.price).toEqual(advert.price);
      expect(result.quantity).toEqual(advert.quantity);
    });
  });

  describe('Create Advert', () => {
    it('should create new advert in database', async () => {
      const advert: CreateAdvertDto = new CreateAdvertDto()
      advert.elementId = new mongoose.Types.ObjectId;
      advert.userId = new mongoose.Types.ObjectId;
      advert.state = 'NUEVO';
      advert.price = 4.99;
      advert.quantity = 2;
      const result = await service.createAdvert(advert);
      expect(result.elementId).toEqual(advert.elementId);
      expect(result.userId).toEqual(advert.userId);
      expect(result.state).toEqual(advert.state);
      expect(result.price).toEqual(advert.price);
      expect(result.quantity).toEqual(advert.quantity);
    });
  });

  describe('Update Advert', () => {
    it('should return the modified advert', async () => {
      const advertObject: UpdateAdvertDto = new UpdateAdvertDto();
      advertObject.elementId = new mongoose.Types.ObjectId;
      advertObject.userId = new mongoose.Types.ObjectId;
      advertObject.state = 'NUEVO';
      advertObject.price = 4.99;
      advertObject.quantity = 2;

      const advert = await new advertModel({
        ...{
          elementId: new mongoose.Types.ObjectId,
          userId: new mongoose.Types.ObjectId,
          state: 'NUEVO',
          price: 3.5,
          quantity: 2
        },
        ...AdvertDtoStub(),
      }).save();
      const untouchedAdvert = await service.updateAdvert(advert._id.toString(), advertObject);
      const updatedAdvert = await service.getAdvert(advert._id.toString());
      expect(untouchedAdvert.elementId).toEqual(advert.elementId);
      expect(updatedAdvert.elementId).toEqual(advert.userId);
      expect(updatedAdvert.state).toEqual(advert.state);
      expect(updatedAdvert.price).toEqual(advert.price);
      expect(updatedAdvert.quantity).toEqual(advert.quantity);

      expect(updatedAdvert.elementId).toEqual(advertObject.elementId);
      expect(updatedAdvert.userId).toEqual(advertObject.userId);
      expect(updatedAdvert.state).toEqual(advertObject.state);
      expect(updatedAdvert.price).toEqual(updatedAdvert.price);
      expect(updatedAdvert.quantity).toEqual(updatedAdvert.quantity);
    });
  });


  describe('Delete Advert', () => {
    it('should return the Deleted Advert', async () => {
      const advert = await new advertModel({
        ...{
          elementId: new mongoose.Types.ObjectId,
          userId: new mongoose.Types.ObjectId,
          state: 'NUEVO',
          price: 3.5,
          quantity: 2
        },
        ...AdvertDtoStub(), 
      }).save();
    // Delete the advert
    const result = await service.deleteAdvert(advert._id.toString());
    expect(result).not.toBe(null);

    // Try to delete the advert again and expect a NotFoundException
    try {
      const result2 = await service.deleteAdvert(advert._id.toString());
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
    });
  });

});
