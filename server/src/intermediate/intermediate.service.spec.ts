import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Connection, Model, connect } from 'mongoose';
import { IntermediateService } from './intermediate.service';
import { Intermediate, IntermediateSchema } from './schema/intermediate.schema';
import { CreateIntermediateDto } from './dto/createIntermediate.dto';
import { UpdateIntermediateDto } from './dto/updateIntermediate.dto';
import { IntermediateDtoStub } from './dto/intermediate.dto.stub';
import { NotFoundException } from '@nestjs/common';

describe('IntermediateService', () => {
  let service: IntermediateService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let intermediateModel: Model<Intermediate>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    intermediateModel = mongoConnection.model(Intermediate.name, IntermediateSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntermediateService, { provide: getModelToken(Intermediate.name), useValue: intermediateModel }],
    }).compile();

    service = module.get(IntermediateService);
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

  describe('Get All Intermediates', () => {
    it('should return the intermediates from the database', async () => {
      await new intermediateModel({
        ...{
          userId: new mongoose.Types.ObjectId,
          collectionId: [new mongoose.Types.ObjectId],
        },
        ... IntermediateDtoStub(),
      }).save();
      const result = await service.getAllIntermediates();
      expect(result.length).toEqual(1);
    });
  });

  describe('Get Intermediate', () => {
    it('should return the intermediate from the database', async () => {
      const intermediate = await new intermediateModel({
        ...{
          userId: new mongoose.Types.ObjectId,
          collectionId: [new mongoose.Types.ObjectId],
        },
        ... IntermediateDtoStub(),
      }).save();
      const result = await service.getIntermediate(intermediate._id.toString());
      expect(result.userId).toEqual(intermediate.userId);
      expect(result.collectionId).toEqual(intermediate.collectionId);
    });
  });

  describe('Create Intermediate', () => {
    it('should create new intermediate in database', async () => {
      const intermediateObject: CreateIntermediateDto = new CreateIntermediateDto()
      intermediateObject.userId = new mongoose.Types.ObjectId();
      intermediateObject.collectionId = [
        new mongoose.Types.ObjectId(), 
        new mongoose.Types.ObjectId()
      ];
      const result = await service.createIntermediate(intermediateObject);
      expect(result.userId).toEqual(intermediateObject.userId);
      expect(result.collectionId).toEqual(intermediateObject.collectionId);
    });
  });

  describe('Update Intermediate', () => {
    it('should return the modified intermediate', async () => {
      const intermediateObject: UpdateIntermediateDto = new UpdateIntermediateDto();
      intermediateObject.userId = new mongoose.Types.ObjectId();
      intermediateObject.collectionId = [
        new mongoose.Types.ObjectId(), 
        new mongoose.Types.ObjectId()
      ];

      const intermediate = await new intermediateModel({
        ...{
          userId: new mongoose.Types.ObjectId,
          collectionId: [new mongoose.Types.ObjectId],
        },
        ...IntermediateDtoStub(),
      }).save();
      const untouchedIntermediate = await service.updateIntermediate(intermediate._id.toString(), intermediateObject);
      const updatedIntermediate = await service.getIntermediate(intermediate._id.toString());
      expect(untouchedIntermediate.userId).toEqual(intermediate.userId);
      expect(untouchedIntermediate.collectionId).toEqual(intermediate.collectionId);

      expect(updatedIntermediate.userId).toEqual(intermediateObject.userId);
      expect(updatedIntermediate.collectionId).toEqual(intermediateObject.collectionId);
    });
  });


  describe('Delete Intermediate', () => {
    it('should return the Deleted Intermediate', async () => {
      const intermediate = await new intermediateModel({
        ...{
          userId: new mongoose.Types.ObjectId,
          collectionId: [new mongoose.Types.ObjectId],
        },
        ...IntermediateDtoStub(), 
      }).save();
    // Delete the intermediate
    const result1 = await service.deleteIntermediate(intermediate._id.toString());
    expect(result1).not.toEqual(null);

    // Try to delete the intermediate again and expect a NotFoundException
    try {
      const result2 = await service.deleteIntermediate(intermediate._id.toString());
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
    });
  });

});
