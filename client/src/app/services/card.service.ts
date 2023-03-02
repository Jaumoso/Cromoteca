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

    // Buscar todas las cartas
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

    // Buscar una carta en concreto
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

    // Buscar las cartas que tiene un usuario en concreto para una colección
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

    // Crear una carta
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

    // Editar una carta
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

    // Borrar una carta en específico
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

    // Borrar cartas cuando se borra la cuenta
    deleteCards(userId: string): Promise<Card[]> {
      console.log(userId)
      return new Promise((resolve, reject) => {
        this.http.delete<{cardData: Card[]}>(baseURL + 'card/deleteall/' + userId)
        .subscribe(cards => {
          resolve(cards.cardData);
        }, err => {
          reject(err);
        });
      });
    }
}