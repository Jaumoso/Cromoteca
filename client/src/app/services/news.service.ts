import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { News } from '../shared/news';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class NewsService {
    constructor(private http: HttpClient) { }

    getNews(): Observable<News[]> {
      return this.http.get<{newsData: News[]}>(baseURL + 'news')
      .pipe(map(news => news.newsData));
    }
}