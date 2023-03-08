import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Connection, Model, connect } from 'mongoose';
import { UserService } from './user.service';
import { User, UserSchema } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDtoStub } from './dto/user.dto.stub';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
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
      providers: [UserService, { provide: getModelToken(User.name), useValue: userModel }],
    }).compile();

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
    expect(service).toBeDefined();
  });

  describe('Get All Users', () => {
    it('should return the users from the database', async () => {
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
      const result = await service.getAllUsers();
      expect(result.length).toEqual(1);
      expect(result[0].email).toEqual(user.email);
      expect(result[0].password).toEqual(user.password);
      expect(result[0].username).toEqual(user.username);
      expect(result[0].firstName).toEqual(user.firstName);
      expect(result[0].lastName).toEqual(user.lastName);
      expect(result[0].entryDate).toEqual(user.entryDate);
      expect(result[0].admin).toEqual(user.admin);
      expect(result[0].addressId).toEqual(user.addressId);
    });
  });

  describe('Get User', () => {
    it('should return the user from the database', async () => {
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
      const result = await service.getUser(user._id.toString());
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

  describe('Find User', () => {
    it('should return the user from the database based on username', async () => {
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
      const result = await service.findUser(user.username);
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

  describe('Check Email', () => {
    it('should return the user from the database based on email', async () => {
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
      const result = await service.checkEmail(user.email);
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

  describe('Check Existing User', () => {
    it('should return the user from the database based on email', async () => {
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
      const result = await service.checkExistingUser(user.username, user.email);
      expect(result[0].email).toEqual(user.email);
      expect(result[0].password).toEqual(user.password);
      expect(result[0].username).toEqual(user.username);
      expect(result[0].firstName).toEqual(user.firstName);
      expect(result[0].lastName).toEqual(user.lastName);
      expect(result[0].entryDate).toEqual(user.entryDate);
      expect(result[0].admin).toEqual(user.admin);
      expect(result[0].addressId).toEqual(user.addressId);
    });
  });


  describe('Create User', () => {
    it('should create new user in database', async () => {
      const userObject: CreateUserDto = new CreateUserDto()
      userObject.email = 'default email';
      userObject.password = 'default password';
      userObject.username = 'default username';
      userObject.firstName = 'default first name';
      userObject.lastName = 'default last name';
      userObject.entryDate = new Date;
      userObject.admin = false;
      userObject.addressId = new mongoose.Types.ObjectId();

      const result = await service.createUser(userObject);
      expect(result.email).toEqual(userObject.email);
      expect(result.password).toEqual(userObject.password);
      expect(result.username).toEqual(userObject.username);
      expect(result.firstName).toEqual(userObject.firstName);
      expect(result.lastName).toEqual(userObject.lastName);
      expect(result.entryDate).toEqual(userObject.entryDate);
      expect(result.admin).toEqual(userObject.admin);
      expect(result.addressId).toEqual(userObject.addressId);
    });
  });

  describe('Update User', () => {
    it('should return the modified user', async () => {
      const userObject: UpdateUserDto = new UpdateUserDto();
      userObject.email = 'updated email';
      userObject.password = 'updated password';
      userObject.username = 'updated username';
      userObject.firstName = 'updated first name';
      userObject.lastName = 'updated last name';
      userObject.entryDate = new Date;
      userObject.admin = true;
      userObject.addressId = new mongoose.Types.ObjectId();

      const user = await new userModel({
        ...{
          email: 'default email',
          password: 'default password',
          username: 'default username',
          firstName: 'default first name',
          lastName: 'default last name',
          entryData: new Date,
          admin: false,
          addressId: new mongoose.Types.ObjectId(),
        },
        ...UserDtoStub(),
      }).save();
      const untouchedUser = await service.updateUser(user._id.toString(), userObject);
      const updatedUser = await service.getUser(user._id.toString());
      expect(untouchedUser.email).toEqual(user.email);
      expect(untouchedUser.password).toEqual(user.password);
      expect(untouchedUser.username).toEqual(user.username);
      expect(untouchedUser.firstName).toEqual(user.firstName);
      expect(untouchedUser.lastName).toEqual(user.lastName);
      expect(untouchedUser.entryDate).toEqual(user.entryDate);
      expect(untouchedUser.admin).toEqual(user.admin);
      expect(untouchedUser.addressId).toEqual(user.addressId);

      expect(updatedUser.email).toEqual(userObject.email);
      expect(updatedUser.password).toEqual(userObject.password);
      expect(updatedUser.username).toEqual(userObject.username);
      expect(updatedUser.firstName).toEqual(userObject.firstName);
      expect(updatedUser.lastName).toEqual(userObject.lastName);
      expect(updatedUser.entryDate).toEqual(userObject.entryDate);
      expect(updatedUser.admin).toEqual(userObject.admin);
      expect(updatedUser.addressId).toEqual(userObject.addressId);
    });
  });


  describe('Delete User', () => {
    it('should return the Deleted User', async () => {
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
        ...UserDtoStub(), 
      }).save();
    // Delete the user
    const result = await service.deleteUser(user._id.toString());
    expect(result).not.toEqual(null);

    // Try to delete the user again and expect a NotFoundException
    try {
      const result2 = await service.deleteUser(user._id.toString());
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
    });
  });

});
