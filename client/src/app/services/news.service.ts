import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { of, Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { News } from '../shared/news';

@Injectable({
    providedIn: 'root'
  })
  export class NewsService {
    constructor(private http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService) { }

    getNews(): Promise<News[]> {
        return new Promise((resolve, reject) => {
          this.http.get<{newsData: News[]}>(baseURL + 'news')
          .subscribe(news => {
            resolve(news.newsData);
          }, err => {
            reject(err);
          });
        });
    }
}