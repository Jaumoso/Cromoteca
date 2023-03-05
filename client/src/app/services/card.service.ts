import { Injectable } from '@angular/core';
import { Card } from '../shared/card';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class CardService {
    constructor(private http: HttpClient) { }

    // Buscar todas las cartas
    getCards(): Observable<Card[]> {
      return this.http.get<{cardData: Card[]}>(baseURL + 'card')
      .pipe(map(cards => cards.cardData));
    }

    // Buscar una carta en concreto
    getCard(cardId: string): Observable<Card> {
      return this.http.get<{cardData: Card}>(baseURL + 'card/' + cardId)
      .pipe(map(card => card.cardData));
    }

    // Buscar las cartas que tiene un usuario en concreto para una colección
    getUserCardsCollection(userId: string, collectionId: string): Observable<Card[]> {
      return this.http.get<{cardData: Card[]}>(baseURL + 'card/' + userId + '/' + collectionId)
      .pipe(map(cards => cards.cardData));
    }

    // Crear una carta
    async createCard(card: Card): Promise<Card> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      return new Promise((resolve, reject) => {
        this.http.post<{cardData: Card}>(baseURL + 'card/new/', card, httpOptions)
        .subscribe(card => {
          resolve(card.cardData);
        }, err => {
          reject(err);
        });
      });
    }

    // Editar una carta
    editCard(cardId: string, card: Card): Observable<Card> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      return this.http.put<{cardData: Card}>(baseURL + 'card/edit' + cardId, card, httpOptions)
      .pipe(map(card => card.cardData));
    }

    // Borrar una carta en específico
    deleteCard(cardId: string): Observable<Card> {
      return this.http.delete<{cardData: Card}>(baseURL + 'card/delete/' + cardId)
      .pipe(map(card => card.cardData));
    }

    // Borrar cartas cuando se borra la cuenta
    async deleteCards(userId: string): Promise<Card[]> {
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