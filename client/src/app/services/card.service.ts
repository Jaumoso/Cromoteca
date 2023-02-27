import { Injectable } from '@angular/core';
import { Card } from '../shared/card';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
    providedIn: 'root'
  })
  export class CardService {
    constructor(private http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService) { }

    getCards(): Promise<Card[]> {
        return new Promise((resolve, reject) => {
          this.http.get<{cardData: Card[]}>(baseURL + 'card')
          .subscribe(cards => {
            resolve(cards.cardData);
          }, err => {
            reject(err);
          });
        });
    }

    getCard(cardId: string): Promise<Card> {
      return new Promise((resolve, reject) => {
        this.http.get<{cardData: Card}>(baseURL + 'card/' + cardId)
        .subscribe(card => {
          resolve(card.cardData); console.log(card.cardData);
        }, err => {
          reject(err);
        });
      });
    }

    getUserCardsCollection(userId: string, collectionId: string): Promise<Card[]> {
        return new Promise((resolve, reject) => {
          this.http.get<{cardData: Card[]}>(baseURL + 'card/' + userId + '/' + collectionId)
          .subscribe(card => {
            resolve(card.cardData); console.log(card.cardData);
          }, err => {
            reject(err);
          });
        });
    }

    createCard(card: Card): Promise<Card> {
      console.log(card);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      return new Promise((resolve, reject) => {
        this.http.post<Card>(baseURL + 'card/new', card, httpOptions)
        .subscribe(cards => {
          resolve(cards);
        }, err => {
          reject(err);
        });
      });
    }

    editCard(cardId: string, card: Card): Promise<Card> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      return new Promise((resolve, reject) => {
        this.http.put<Card>(baseURL + 'card/edit' + cardId, card, httpOptions)
        .subscribe(cards => {
          resolve(cards);
        }, err => {
          reject(err);
        });
      });
    }

    deleteCard(cardId: string): Promise<Card> {
      console.log(cardId)
      return new Promise((resolve, reject) => {
        this.http.delete<Card>(baseURL + 'card/delete/' + cardId)
        .subscribe(cards => {
          resolve(cards);
        }, err => {
          reject(err);
        });
      });
    }
}