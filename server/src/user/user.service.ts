import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interface/user.interface';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private userModel:Model<IUser>) { }

    async getAllUsers(): Promise<IUser[]> {
      const userData = await this.userModel.find()
      if (!userData || userData.length == 0) {
          throw new NotFoundException('Users data not found!');
      }
      return userData;
    }

    async createUser(userDto: CreateUserDto ): Promise<IUser> {
        const newUser = await this.userModel.create(userDto);
        if (!newUser) {
            throw new NotFoundException('Could not create user!');
        }
        return newUser;
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto) {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto);
        if (!updatedUser) {
            throw new NotFoundException('User data not found!');
        }
        return updatedUser;
    }

    async deleteUser(userId: string): Promise<IUser> {
        const deletedUser = await this.userModel.findByIdAndDelete(userId);
      if (!deletedUser) {
        throw new NotFoundException(`User #${userId} not found`);
      }
      return deletedUser;
    }


}
