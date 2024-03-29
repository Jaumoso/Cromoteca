import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, sanitizeFilter } from 'mongoose';
import { CardDocument } from './schema/card.schema';
import { CreateCardDto } from './dto/createCard.dto';
import { UpdateCardDto } from './dto/updateCard.dto';

@Injectable()
export class CardService {

    constructor(@InjectModel('Card') private cardModel:Model<CardDocument>) { }

    async getAllCards(): Promise<CardDocument[]> {
      const cardData = await this.cardModel.find()
      if (!cardData || cardData.length == 0) {
          throw new NotFoundException('Cards data not found!');
      }
      return cardData;
    }

    async getCard(cardId: string): Promise<CardDocument> {
        const cardData = await this.cardModel.findById(cardId);
        if (!cardData) {
            throw new NotFoundException('Card data not found!');
        }
        return cardData;
    }

    async getUserCardsCollection(userId: string, collectionId: string): Promise<CardDocument[]> {
        const cardData = await this.cardModel.find({ userId: userId, collectionId: collectionId}).sort({ "cardId":1});
        if (!cardData) {
            throw new NotFoundException('Card data not found!');
        }
        return cardData;
    }

    async getUserCards(userId: string): Promise<CardDocument[]> {
        const cardData = await this.cardModel.find({ userId: userId}).sort({ "cardId":1});
        if (!cardData) {
            throw new NotFoundException('Card data not found!');
        }
        return cardData;
    }

    async createCard(cardDto: CreateCardDto ): Promise<CardDocument> {
        const newCard = await this.cardModel.create(cardDto);
        if (!newCard) {
            throw new NotFoundException('Could not create card!');
        }
        return newCard;
    }

    async updateCard(cardId: string, updateCardDto: UpdateCardDto) {
        const updatedCard = await this.cardModel.findByIdAndUpdate(cardId, sanitizeFilter(updateCardDto));
        if (!updatedCard) {
            throw new NotFoundException('Card data not found!');
        }
        return updatedCard;
    }

    async deleteCard(cardId: string): Promise<CardDocument> {
        const deletedCard = await this.cardModel.findByIdAndDelete(cardId);
      if (!deletedCard) {
        throw new NotFoundException(`Card #${cardId} not found`);
      }
      return deletedCard;
    }

    async deleteUserCards(userId: string): Promise<CardDocument[]> {
        const userCards = await this.cardModel.find({ userId: userId });
        if (!userCards) {
            throw new NotFoundException(`Cards for user ${userId} not found`);
        }
        else{
            userCards.forEach(async card => {
                await this.cardModel.findByIdAndDelete({ _id: card._id });
            });
        }
      return userCards;
    }

    async deleteUserCardsFromCollection(userId: string, collectionId: string): Promise<CardDocument[]> {
        const userCards = await this.cardModel.find({ userId: userId, collectionId: collectionId });
        if (userCards) {
            userCards.forEach(async card => {
                await this.cardModel.findByIdAndDelete({ _id: card._id });
            });
        }
        else{
            throw new NotFoundException(`Cards for user ${userId} and collection ${collectionId} not found`);
        }
        return userCards;
    }


}
