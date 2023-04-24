import { Injectable } from '@angular/core';
import { AddressService } from './address.service';
import { CardService } from './card.service';
import { LoginStatusService } from './loginStatus.service';
import { UserService } from './user.service';
import { Address } from '../shared/address';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(
    private addressService: AddressService,
    private cardService: CardService,
    private loginStatusService: LoginStatusService,
    private userService: UserService
  ) { }

  async createAccount(user: User, address: Address) {
    try {
      await this.addressService.createAddress(address)
      .then((address) => {
        console.log("Dirección creada correctamente");
        user.addressId = address._id;
        this.userService.createUser(user)
        .then((user) => {
          if(user){
            console.log("Usuario creado correctamente");
            //TODO: comprobar que funciona bien 
          }
        });        
      })
    } catch (error) {
      console.error("Error creando la cuenta", error);
      throw new Error("No se ha podido crear la cuenta");
    }
  }

  async updateAccount(addressId: string, address: Address, userId: string, user: User) {
    try {
      await this.addressService.updateAddress(addressId, address)
      .then(() => {
        this.userService.updateUser(userId, user);
        console.log("Cuenta actualizada correctamente");
      })

    } catch (error) {
      console.error("Error actualizando la cuenta", error);
      throw new Error("No se ha podido actualizar la información");
    }
  }

  async deleteAccount(userId: string, addressId: string): Promise<boolean> {
    try {
      await this.cardService.deleteCards(userId);
      await this.addressService.deleteAddress(addressId);
      await this.userService.deleteUser(userId);
      localStorage.removeItem('token');
      this.loginStatusService.loggedIn = false;
      return true;
    } catch {
      return false;
    }
  }
}
