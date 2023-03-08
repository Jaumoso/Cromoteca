import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { AddressService } from './address.service';
import { Address, AddressSchema } from './schema/address.schema';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdateAddressDto } from './dto/updateAddress.dto';
import { AddressDtoStub } from './dto/address.dto.stub';
import { NotFoundException } from '@nestjs/common';

describe('AddressService', () => {
  let service: AddressService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let addressModel: Model<Address>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    addressModel = mongoConnection.model(Address.name, AddressSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressService, { provide: getModelToken(Address.name), useValue: addressModel }],
    }).compile();

    service = module.get(AddressService);
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

  describe('Get All Addressess', () => {
    it('should return the addressess from the database', async () => {
      await new addressModel({
        ...{
          street: 'default street',
          city: 'default city',
          postalCode: 'default postal code',
          province: 'default province',
          country: 'default country'
        },
        ... AddressDtoStub(),
      }).save();
      const result = await service.getAllAddressess();
      expect(result.length).toBe(1);
    });
  });

  describe('Get Address', () => {
    it('should return the address from the database', async () => {
      const address = await new addressModel({
        ...{
          street: 'default street',
          city: 'default city',
          postalCode: 'default postal code',
          province: 'default province',
          country: 'default country'
        },
        ... AddressDtoStub(),
      }).save();
      const result = await service.getAddress(address._id.toString());
      expect(result.street).toBe(address.street);
      expect(result.city).toBe(address.city);
      expect(result.postalCode).toBe(address.postalCode);
      expect(result.province).toBe(address.province);
      expect(result.country).toBe(address.country);
    });
  });

  describe('Create Address', () => {
    it('should create new address in database', async () => {
      const addressObject: CreateAddressDto = new CreateAddressDto()
      addressObject.city = 'default city';
      addressObject.country = 'default country';
      addressObject.postalCode = '12345';
      addressObject.province = 'default province';
      addressObject.street = 'default street';
      const result = await service.createAddress(addressObject);
      expect(result.city).toBe('default city');
      expect(result.country).toBe('default country');
      expect(result.postalCode).toBe('12345');
      expect(result.province).toBe('default province');
      expect(result.street).toBe('default street');
    });
  });

  describe('Update Address', () => {
    it('should return the modified address', async () => {
      const addressObject: UpdateAddressDto = new UpdateAddressDto();
      addressObject.city = 'updated city';
      addressObject.country = 'updated country';
      addressObject.postalCode = '54321';
      addressObject.street = 'updated street';
      addressObject.province = 'updated province';

      const address = await new addressModel({
        ...{
          street: 'default street',
          city: 'default city',
          postalCode: 'default postal code',
          province: 'default province',
          country: 'default country'
        },
        ...AddressDtoStub(),
      }).save();
      const untouchedAddress = await service.updateAddress(address._id.toString(), addressObject);
      const updatedAddress = await service.getAddress(address._id.toString());
      expect(untouchedAddress.city).toBe(address.city);
      expect(untouchedAddress.province).toBe(address.province);
      expect(untouchedAddress.postalCode).toBe(address.postalCode);
      expect(untouchedAddress.country).toBe(address.country);
      expect(untouchedAddress.street).toBe(address.street);

      expect(updatedAddress.city).toBe(addressObject.city);
      expect(updatedAddress.province).toBe(addressObject.province);
      expect(updatedAddress.postalCode).toBe(addressObject.postalCode);
      expect(updatedAddress.country).toBe(addressObject.country);
      expect(updatedAddress.street).toBe(addressObject.street);
    });
  });


  describe('Delete Address', () => {
    it('should return the Deleted Address', async () => {
      const address = await new addressModel({
        ...{
          street: 'default street',
          city: 'default city',
          postalCode: 'default postal code',
          province: 'default province',
          country: 'default country'
        },
        ...AddressDtoStub(), 
      }).save();
    // Delete the address
    const result1 = await service.deleteAddress(address._id.toString());
    expect(result1).not.toBe(null);

    // Try to delete the address again and expect a NotFoundException
    try {
      const result2 = await service.deleteAddress(address._id.toString());
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
    });
  });

});
