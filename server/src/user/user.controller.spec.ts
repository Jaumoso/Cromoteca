import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Connection, Model, connect } from 'mongoose';
import { UserController } from './user.controller';
import { User, UserDocument, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { HttpStatus } from '@nestjs/common';

describe('UserService', () => {
  let controller: UserController;
  let service: UserService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserController, UserService, { provide: getModelToken(User.name), useValue: userModel }],
    }).compile();

    controller = module.get(UserController);
    service = module.get(UserService);
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
    expect(controller).toBeDefined();
  });

  describe('getUserData', () => {
    it('should return user data', async () => {
      const mockUserData = {
        _id: new mongoose.Types.ObjectId,
        email: 'email1@example.com',
        password: 'password1',
        username: 'username1',
        firstName: 'firstName1',
        lastName: 'lastName1',
        entryDate: new Date,
        admin: false,
        addressId: new mongoose.Types.ObjectId,
      };
      const getUserDataMock = jest.fn().mockResolvedValue(mockUserData);
  
      const userData = await getUserDataMock();
  
      expect(userData).toEqual(mockUserData);
    });
  });

  describe('getUsers', () => {
    it('should return all users data found successfully', async () => {
      const mockUserData: UserDocument[] = [
        { 
          _id: new mongoose.Types.ObjectId,
          email: 'email1@example.com',
          password: 'password1',
          username: 'username1',
          firstName: 'firstName1',
          lastName: 'lastName1',
          entryDate: new Date,
          admin: false,
          addressId: new mongoose.Types.ObjectId,
        },
        { 
          _id: new mongoose.Types.ObjectId,
          email: 'email2@example.com',
          password: 'password2',
          username: 'username2',
          firstName: 'firstName2',
          lastName: 'lastName2',
          entryDate: new Date,
          admin: false,
          addressId: new mongoose.Types.ObjectId,
        },
      ];
      jest.spyOn(service, 'getAllUsers').mockResolvedValue(mockUserData);

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.getUsers(response);

      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.json).toHaveBeenCalledWith({
        message: 'All users data found successfully',
        userData: mockUserData,
      });
    });

    it('should return an error response if an error occurs', async () => {
      const mockError = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        response: { message: 'Internal server error' },
      };
      jest.spyOn(service, 'getAllUsers').mockRejectedValue(mockError);

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.getUsers(response);

      expect(response.status).toHaveBeenCalledWith(mockError.status);
      expect(response.json).toHaveBeenCalledWith(mockError.response);
    });
  });
});