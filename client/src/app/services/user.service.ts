import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { AddressService } from './address.service';
import { IntermediateService } from './intermediate.service';
import { CardService } from './card.service';
import { LoginStatusService } from './loginStatus.service';

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    constructor(private http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService,
        private addressService: AddressService,
        private cardService: CardService,
        private intermediateService: IntermediateService,
        private loginStatusService: LoginStatusService,
        ) { }

    getUser(userId: string): Promise<User> {
      return new Promise((resolve, reject) => {
        this.http.get<{userData: User}>(baseURL + 'user/' + userId)
        .subscribe(user => {
          resolve(user.userData);
        }, err => {
          reject(err);
        });
      });
    }

    createUser(user: User): Promise<User> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return new Promise((resolve, reject) => {
        this.http.post<{newUser: User}>(baseURL + 'user/new', user, httpOptions)
        .subscribe(user => {
          resolve(user.newUser);
        }, err => {
          reject(err);
        });
      });
    }

    updateUser(userId: string, user: User): Promise<User> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return new Promise((resolve, reject) => {
        this.http.put<{existingUser: User}>(baseURL + 'user/update/' + userId, user, httpOptions)
        .subscribe(user => {
          resolve(user.existingUser);
        }, err => {
          reject(err);
        });
      });
    }

    deleteUser(userId: string): Promise<User> {
      return new Promise((resolve, reject) => {
        this.http.delete<{userData: User}>(baseURL + 'user/delete/' + userId)
        .subscribe(user => {
          resolve(user.userData);
        }, err => {
          reject(err);
        });
      });
    }

    checkEmail(email: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        this.http.get<{userData: User}>(baseURL + 'user/checkemail/' + email)
        .subscribe(user => {
          if(user){
            resolve(true);
          }
          else{
             resolve(false);
          }
        }, err => {
          reject(err);
        });
      });
    }

    checkExistingUser(username: string, email: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        this.http.get<{userData: User[]}>(baseURL + 'user/checkexistinguser/' + username + '/' + email)
        .subscribe(user => {
          console.log(user)
          if(user){
            resolve(true);
          }
          else{
             resolve(false);
          }
        }, err => {
          resolve(false);
          reject(err);
        });
      });
    }

    deleteAccount(userId: string, addressId: string): Promise<boolean> {
      return this.cardService.deleteCards(userId)
        .then(() => this.addressService.deleteAddress(addressId))
        .then(() => this.intermediateService.deleteIntermediate(userId))
        .then(() => this.deleteUser(userId))
        .then(() => { 
          localStorage.removeItem('token'); 
          this.loginStatusService.loggedIn = false;
          return true; })
        .catch(() => false);
    }
}