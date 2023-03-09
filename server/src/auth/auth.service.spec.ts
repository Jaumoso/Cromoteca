import { getModelToken } from '@nestjs/mongoose'; 
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Connection, Model, connect } from 'mongoose';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from '../user/schema/user.schema';
import { UserDtoStub } from 'src/user/dto/user.dto.stub';

describe('AuthService', () => {
  let service: AuthService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, { provide: getModelToken(User.name), useValue: userModel }],
    }).compile();

    service = module.get(AuthService);
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

  describe('Validate User', () => {
    it('should return the valid user from DB', async () => {
      const user = await new userModel({
        ...{
          email: 'default email',
          password: 'default password',
          username: 'default username',
          firstName: 'default first name',
          lastName: 'default last name',
          entryData: new Date,
          admin: 0,
          addressId: new mongoose.Types.ObjectId(),
        },
        ... UserDtoStub(),
      }).save();
      const result = await service.validateUser(user.username, user.password);
      expect(result.email).toEqual(user.email);
      expect(result.password).toEqual(user.password);
      expect(result.username).toEqual(user.username);
      expect(result.firstName).toEqual(user.firstName);
      expect(result.lastName).toEqual(user.lastName);
      expect(result.entryDate).toEqual(user.entryDate);
      expect(result.admin).toEqual(user.admin);
      expect(result.addressId).toEqual(user.addressId);
    });
  });

  describe('Login', () => {
    it('should login', async () => {
      const user = {
        _id: mongoose.Types.ObjectId,
        email: 'default email',
        password: 'default password',
        username: 'default username',
        firstName: 'default first name',
        lastName: 'default last name',
        entryDate: new Date,
        admin: false,
        addressId: mongoose.Types.ObjectId,
      }
      const result = await service.login(user)
      expect(result.access_token).not.toBe(null);
    });
  });

});
