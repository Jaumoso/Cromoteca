import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Collection } from '../shared/collection';
import { CollectionService } from './collection.service';
@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    constructor(
      private http: HttpClient,
      private collectionService: CollectionService
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

    updateUserContent(userId: string, user: User): Promise<User> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return new Promise((resolve, reject) => {
        const { _id, firstName, lastName, email, password, username, entryDate, admin, addressId, ... rest} = user
        this.http.put<{existingUser: User}>(baseURL + 'user/update/content/' + userId, rest, httpOptions)
        .subscribe(user => {
          resolve(user.existingUser);
        }, err => {
          reject(err);
        });
      });
    }

    async deleteUser(userId: string): Promise<User> {
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
        this.http.get<{userData: boolean}>(baseURL + 'user/checkemail/' + email)
        .subscribe(user => {
          if(user.userData != null){
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
          if(user){
            resolve(true);
          }
          else{
             resolve(false);
          }
        }, err => {
          resolve(false);
        });
      });
    }

    getCollections(userId: string): Promise<Collection[]> {
      return new Promise((resolve, reject) => {
        this.http.get<{ userData: User }>(baseURL + 'user/' + userId)
          .subscribe(user => {
            const collectionIds = user.userData.collectionId;
            let collections: Collection[] = [];
            if (collectionIds != undefined) {
              for (let collectionId of collectionIds) {
                this.collectionService.getCollection(collectionId)
                .then((collection) => collections.push(collection))
                .catch((error) => {console.error(error);});
              }
            }
            resolve(collections);
          }, err => {
            reject(err);
          });
      });
    }
}