import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Address } from '../shared/address';

@Injectable({
    providedIn: 'root'
  })
  export class AddressService {
    constructor(private http: HttpClient) { }

    getAddress(addressId: string): Promise<Address> {
      return new Promise((resolve, reject) => {
        this.http.get<{addressData: Address}>(baseURL + 'address/' + addressId)
        .subscribe(address => {
          resolve(address.addressData);
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
        this.http.post<{newAddress: Address}>(baseURL + 'address/new', address, httpOptions)
        .subscribe(address => {
          resolve(address.newAddress);
          console.log(address);
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
        this.http.put<{addressData: Address}>(baseURL + 'address/update/' + addressId, address, httpOptions)
        .subscribe(address => {
          resolve(address.addressData);
        }, err => {
          reject(err);
        });
      });
    }

    async deleteAddress(addressId: string): Promise<Address> {
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