import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { of, Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    constructor(private http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService) { }

    getUser(userId: string): Promise<User> {
      return new Promise((resolve, reject) => {
        this.http.get<{userData: User}>(baseURL + 'user/' + userId)
        .subscribe(user => {
          resolve(user.userData); console.log(user.userData);
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
        this.http.post<User>(baseURL + 'user/new', user, httpOptions)
        .subscribe(user => {
          resolve(user);
        }, err => {
          reject(err);
        });
      });
    }

    editUser(userId: string, user: User): Promise<User> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return new Promise((resolve, reject) => {
        this.http.put<User>(baseURL + 'user/edit' + userId, user, httpOptions)
        .subscribe(user => {
          resolve(user);
        }, err => {
          reject(err);
        });
      });
    }

    deleteUser(userId: string): Promise<User> {
      return new Promise((resolve, reject) => {
        this.http.delete<User>(baseURL + 'user/delete' + userId)
        .subscribe(user => {
          resolve(user);
        }, err => {
          reject(err);
        });
      });
    }
}