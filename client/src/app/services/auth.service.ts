import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { User } from '../shared/user';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService) { }
    
    login(user: Object): Promise<any> {
        const httpOptions = {
            headers: new HttpHeaders({
            'Content-Type': 'application/json'
            })
        };
        console.log(user);
        return new Promise((resolve, reject) => {
            this.http.post<any>(baseURL + 'auth/login', user, httpOptions)
            .subscribe(login => {
            resolve(login);
            }, err => {
            reject(err);
            });
        });
    }
}