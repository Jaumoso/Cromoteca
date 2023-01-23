import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';

@ApiTags('News')
@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) { }

    @Get()
    @ApiCreatedResponse({ description: 'This function will get ALL the NEWS from the database.' })
    async getLastNews(@Res() response) {
        try {
            const newsData = await this.newsService.getLastNews();
            return response.status(HttpStatus.OK).json({
                message: 'Last news data found successfully', newsData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }

    }
}