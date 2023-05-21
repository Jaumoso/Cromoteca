import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmailService {
  private url = 'https://mailthis.to/Cromoteca';

  constructor(private http: HttpClient) {}

  SendEmail(input: any) {
    console.log(input);
    return this.http.post(this.url, input).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    );
  }
}