import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Address } from '../shared/address';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.scss']
})
export class CreateaccountComponent implements OnInit {

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private addressService: AddressService
  ) {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required, Validators.pattern('[a-zA-Z ]')],
      lastName: ['', Validators.required, Validators.pattern('[a-zA-Z ]')],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(8)],
      password2: ['', Validators.required, Validators.minLength(8)],
      username: ['', Validators.required],
      // entryDate
      // admin
      // Address:
      street: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required, Validators.pattern('[a-zA-Z ]')],
      province: ['', Validators.required, Validators.pattern('[a-zA-Z ]')],
      country: ['', Validators.required, Validators.pattern('[a-zA-Z ]')],
    });
   }

  ngOnInit(): void {
  }

  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    username: '',
    entryDate: Date,
    admin: false,
    address: {
      street: '',
      postalCode: '',
      city: '',
      province: '',
      country: '',
    }
  }
  // ! entry date // admin

  form: FormGroup;

  onSubmit() {
    if(
      this.user.firstName &&
      this.user.lastName &&
      this.user.email &&
      this.user.password == this.user.passwordConfirmation &&
      this.user.username &&
      this.user.address.street &&
      this.user.address.postalCode &&
      this.user.address.city &&
      this.user.address.province &&
      this.user.address.country
      ){
        let address = new Address;
        address.street = this.user.address.street;
        address.postalCode = this.user.address.postalCode;
        address.city = this.user.address.city;
        address.province = this.user.address.province;
        address.country = this.user.address.country;
        this.addressService.createAddress(address)
        .then(
          (address) => {
            console.log('Dirección' + address);
            console.log('ID Dirección' + address._id);
            let user = new User;
            user.firstName = this.user.firstName;
            user.lastName = this.user.lastName;
            user.email = this.user.email;
            user.password = this.user.password;
            user.username = this.user.username;
            user.entryDate = Date.toString();
            user.admin = false;
            user.address = address._id! // ! assertion
            this.userService.createUser(user)
            .then((user) => {
              console.log('Usuario' + user);
              console.log('Usuario creado');
            });
          }
        );
      }
  }

  goBack() {
    this.location.back();
  }

}
