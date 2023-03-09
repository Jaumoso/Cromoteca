import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Connection, Model, connect } from 'mongoose';
import { CardService } from './card.service';
import { Card, CardSchema } from './schema/card.schema';
import { CreateCardDto } from './dto/createCard.dto';
import { UpdateCardDto } from './dto/updateCard.dto';
import { CardDtoStub } from './dto/card.dto.stub';
import { NotFoundException } from '@nestjs/common';

describe('CardService', () => {
  let service: CardService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let cardModel: Model<Card>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    cardModel = mongoConnection.model(Card.name, CardSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardService, { provide: getModelToken(Card.name), useValue: cardModel }],
    }).compile();

    service = module.get(CardService);
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

  describe('Get All Cards', () => {
    it('should return the cards from the database', async () => {
      await new cardModel({
        ...{
          userId: '1234567890',
          collectionId: '0987654321',
          cardId: 1,
          name: 'default name',
          repeated: 0,
          description: 'default description',
          state: 'default state',
          price: 0,
        },
        ... CardDtoStub(),
      }).save();
      const result = await service.getAllCards();
      expect(result.length).toBe(1);
    });

    it('Get all cards should return error', async () => {
    // Try to delete the card again and expect a NotFoundException
    try {
      await service.getAllCards();
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }

  });
});

  describe('Get Card', () => {
    it('should return the card from the database', async () => {
      const card = await new cardModel({
        ...{
          userId: '1234567890',
          collectionId: '0987654321',
          cardId: 1,
          name: 'default name',
          repeated: 0,
          description: 'default description',
          state: 'default state',
          price: 0,
        },
        ... CardDtoStub(),
      }).save();
      const result = await service.getCard(card._id.toString());
      expect(result.userId).toEqual(card.userId);
      expect(result.collectionId).toEqual(card.collectionId);
      expect(result.cardId).toBe(card.cardId);
      expect(result.name).toBe(card.name);
      expect(result.description).toBe(card.description);
      expect(result.repeated).toBe(card.repeated);
      expect(result.state).toBe(card.state);
      expect(result.price).toBe(card.price);
    });
  });

  describe('Create Card', () => {
    it('should create new card in database', async () => {
      const cardObject: CreateCardDto = new CreateCardDto()
      cardObject.cardId = 1;
      cardObject.collectionId = new mongoose.Types.ObjectId;
      cardObject.description = 'default description';
      cardObject.name = 'default name';
      cardObject.price = 0;
      cardObject.repeated = 0;
      cardObject.state = 'NUEVO';
      cardObject.userId = new mongoose.Types.ObjectId;

      const result = await service.createCard(cardObject);
      expect(result.cardId).toEqual(cardObject.cardId);
      expect(result.collectionId).toBe(cardObject.collectionId);
      expect(result.description).toBe(cardObject.description);
      expect(result.name).toBe(cardObject.name);
      expect(result.price).toBe(cardObject.price);
      expect(result.repeated).toBe(cardObject.repeated);
      expect(result.state).toBe(cardObject.state);
      expect(result.userId).toEqual(cardObject.userId);
    });
  });

  describe('Update Card', () => {
    it('should return the modified card', async () => {
      const cardObject: UpdateCardDto = new UpdateCardDto();
      cardObject.cardId = 1;
      cardObject.collectionId = new mongoose.Types.ObjectId();
      cardObject.description = 'default description';
      cardObject.name = 'default name';
      cardObject.price = 0;
      cardObject.repeated = 0;
      cardObject.state = 'NUEVO';
      cardObject.userId = new mongoose.Types.ObjectId();

      const card = await new cardModel({
        ...{
          userId: new mongoose.Types.ObjectId,
          collectionId: new mongoose.Types.ObjectId,
          cardId: 1,
          name: 'default name',
          repeated: 0,
          description: 'default description',
          state: 'default state',
          price: 0,
        },
        ...CardDtoStub(),
      }).save();
      const untouchedCard = await service.updateCard(card._id.toString(), cardObject);
      const updatedCard = await service.getCard(card._id.toString());
      expect(untouchedCard.userId).toEqual(card.userId);
      expect(untouchedCard.collectionId).toEqual(card.collectionId);
      expect(untouchedCard.cardId).toBe(card.cardId);
      expect(untouchedCard.name).toBe(card.name);
      expect(untouchedCard.repeated).toBe(card.repeated);
      expect(untouchedCard.description).toBe(card.description);
      expect(untouchedCard.state).toBe(card.state);
      expect(untouchedCard.price).toBe(card.price);

      expect(updatedCard.userId).toEqual(cardObject.userId);
      expect(updatedCard.collectionId).toEqual(cardObject.collectionId);
      expect(updatedCard.cardId).toBe(cardObject.cardId);
      expect(updatedCard.name).toBe(cardObject.name);
      expect(updatedCard.repeated).toBe(cardObject.repeated);
      expect(updatedCard.description).toBe(cardObject.description);
      expect(updatedCard.state).toBe(cardObject.state);
      expect(updatedCard.price).toBe(cardObject.price);
      expect(updatedCard.userId).toEqual(cardObject.userId);
    });
  });


  describe('Delete Card', () => {
    it('should return the Deleted Card', async () => {
      const card = await new cardModel({
        ...{
          userId: new mongoose.Types.ObjectId,
          collectionId: new mongoose.Types.ObjectId,
          cardId: 1,
          name: 'default name',
          repeated: 0,
          description: 'default description',
          state: 'default state',
          price: 0,
        },
        ...CardDtoStub(), 
      }).save();
    // Delete the card
    const result1 = await service.deleteCard(card._id.toString());
    expect(result1).not.toBe(null);

    // Try to delete the card again and expect a NotFoundException
    try {
      const result2 = await service.deleteCard(card._id.toString());
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
    });
  });

  describe('Delete User Cards', () => {
    it('should return the Deleted Cards', async () => {
      const card = await new cardModel({
        ...{
          userId: new mongoose.Types.ObjectId,
          collectionId: new mongoose.Types.ObjectId,
          cardId: 1,
          name: 'default name',
          repeated: 0,
          description: 'default description',
          state: 'default state',
          price: 0,
        },
        ...CardDtoStub(), 
      }).save();
    // Delete the card
    const result1 = await service.deleteUserCards(card.userId.toString());
    expect(result1).not.toBe(null);

    // Try to delete the card again and expect a NotFoundException
    try {
      const result2 = await service.deleteUserCards(card.userId.toString());
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
    });
  });


});
