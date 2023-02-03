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
    
    login(username: string, password: string): Promise<any> {
        const httpOptions = {
            headers: new HttpHeaders({
            'Content-Type': 'application/json'
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post<any>(baseURL + 'auth/login', { username, password }, httpOptions)
            .subscribe(token => {
            resolve(token = token.access_token);
            }, err => {
            reject(err);
            });
        });
    }
    
    setSession(token: string) {
        localStorage.setItem('token', token);
    }
    
    closeSession(): void {
        localStorage.removeItem('token');
    }
}