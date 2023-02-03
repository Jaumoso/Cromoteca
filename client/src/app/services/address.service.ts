import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { of, Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Address } from '../shared/address';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })
  export class AddressService {
    constructor(private http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService) { }

    getAddress(addressId: string): Promise<Address> {
      return new Promise((resolve, reject) => {
        this.http.get<{addressData: Address}>(baseURL + 'address/' + addressId)
        .subscribe(address => {
          resolve(address.addressData); console.log(address.addressData);
        }, err => {
          reject(err);
        });
      });
    }

    createAddress(address: Address): Promise<Address> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return new Promise((resolve, reject) => {
        this.http.post<{addressData: Address}>(baseURL + 'address/new', address, httpOptions)
        .subscribe(address => {
          resolve(address.addressData);
        }, err => {
          reject(err);
        });
      });
    }

    updateAddress(addressId: string, address: Address): Promise<Address> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return new Promise((resolve, reject) => {
        this.http.put<{addressData: Address}>(baseURL + 'address/update/' + addressId, address)
        .subscribe(address => {
          resolve(address.addressData);
        }, err => {
          reject(err);
        });
      });
    }

    deleteAddress(addressId: string): Promise<Address> {
        return new Promise((resolve, reject) => {
          this.http.delete<{addressData: Address}>(baseURL + 'address/delete/' + addressId)
          .subscribe(address => {
            resolve(address.addressData);
          }, err => {
            reject(err);
          });
        });
    }
}