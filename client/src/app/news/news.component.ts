import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { News } from '../shared/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(private newsService: NewsService) { }
  
  news: News[] | undefined;
  errmsg: string | undefined;

  ngOnInit() {
    this.newsService.getNews()
      .subscribe(news => {this.news = news;})
  }
}

