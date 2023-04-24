import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CardService } from "./card.service";
import { CreateCardDto } from "./dto/createCard.dto";
import { UpdateCardDto } from "./dto/updateCard.dto";


@ApiTags('Card')
@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) { }
    
/*     @Get()
    @ApiCreatedResponse({ description: 'This function will get ALL the CARDS from the database.' })
    async getCards(@Res() response) {
        try {
            const cardData = await this.cardService.getAllCards();
            return response.status(HttpStatus.OK).json({
                message: 'All cards data found successfully', cardData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    } */

    @Get(':id')
    @ApiCreatedResponse({ description: 'This function will get ONE CARD INFO from the database.' })
    async getCard(@Res() response, @Param('id') cardId: string) {
        try {
            const cardData = await this.cardService.getCard(cardId);
            return response.status(HttpStatus.OK).json({
                message: 'Card data found successfully', cardData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    
    @UseGuards(JwtAuthGuard)
    @Get(':userId/:collectionId')
    @ApiCreatedResponse({ description: 'This function will get ONE CARD INFO from the database.' })
    async getUserCardsCollection(@Res() response, @Param('userId') userId: string,  @Param('collectionId') collectionId: string) {
        try {
            const cardData = await this.cardService.getUserCardsCollection(userId, collectionId);
            return response.status(HttpStatus.OK).json({
                message: 'Card data found successfully', cardData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('user/:userId')
    @ApiCreatedResponse({ description: 'This function will get ONE CARD INFO from the database.' })
    async getUserCards(@Res() response, @Param('userId') userId: string) {
        try {
            const cardData = await this.cardService.getUserCards(userId);
            return response.status(HttpStatus.OK).json({
                message: 'Card data found successfully', cardData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('new')
    @ApiCreatedResponse({ description: 'Creation of a NEW CARD and insertion in the database.' })
    async createCard(@Res() response, @Body() createCardDto: CreateCardDto) {
        try {
            const newCard = await this.cardService.createCard(createCardDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Card has been created successfully', newCard,
            });
        }
        catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Card not created!',
                error: 'Bad Request'
            });
        }
    }

/*     @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiCreatedResponse({ description: 'UPDATE te data of the CARD into the database.' })
    async updateCard(@Res() response, @Param('id') cardId: string, @Body() updateCardDto: UpdateCardDto) {
        try {
            const existingCard = await this.cardService.updateCard(cardId, updateCardDto);
            return response.status(HttpStatus.OK).json({
                message: 'Card has been successfully updated',
                existingCard,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    } */

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiCreatedResponse({ description: 'This function will DELETE the CARD with the ID passed as parameter from the database.' })
    async deleteCard(@Res() response, @Param('id') cardId: string) {
        try {
            const deletedCard = await this.cardService.deleteCard(cardId);
            return response.status(HttpStatus.OK).json({
                message: 'Card deleted successfully',
                deletedCard,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('deletefromcollection/:userId/:collectionId')
    @ApiCreatedResponse({ description: 'Borrar todos los elementos de colecciones que contengan el id del usuario y el id de colección que se le pasa como argumento.' })
    async deleteUserCardsFromCollection(@Res() response, @Param('userId') userId: string, @Param('collectionId') collectionId: string) {
        try {
            const deletedCard = await this.cardService.deleteUserCardsFromCollection(userId, collectionId);
            return response.status(HttpStatus.OK).json({
                message: 'Card deleted successfully',
                deletedCard,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('deleteall/:userId')
    @ApiCreatedResponse({ description: 'Borrar todos los elementos de colecciones que contengan el id del usuario que se le pasa como argumento.' })
    async deleteUserCards(@Res() response, @Param('userId') userId: string) {
        try {
            const deletedCard = await this.cardService.deleteUserCards(userId);
            return response.status(HttpStatus.OK).json({
                message: 'Card deleted successfully',
                deletedCard,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

}
