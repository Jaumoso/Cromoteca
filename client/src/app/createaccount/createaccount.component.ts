import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Address } from '../shared/address';
import { AddressService } from '../services/address.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../collections/collections.component';
import { IntermediateService } from '../services/intermediate.service';
import { Intermediate } from '../shared/intermediate';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.scss'],
})
export class CreateaccountComponent implements OnInit {

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private addressService: AddressService,
    private intermediateService: IntermediateService,
    private router: Router,
    public dialog: MatDialog,
    public dialog2: MatDialog
  ) {
    this.form = this.formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
      username: this.username,
      // entryDate
      // admin
      // Address:
      street: this.street,
      postalCode: this.postalCode,
      city: this.city,
      province: this.province,
      country: this.country
    });
   }

  ngOnInit(): void {
  }

  firstName = new FormControl('', [Validators.required, /* Validators.pattern("/^[a-z ,.'-]+$/i"), */ Validators.minLength(4)]);
  lastName = new FormControl('', [/* Validators.pattern("/^[a-z ,.'-]+$/i"), */ Validators.minLength(2)]);
  email = new FormControl('', [ Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  passwordConfirmation = new FormControl('', [Validators.required, Validators.minLength(8)]);
  username = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(18)/* , Validators.pattern("^[A-Za-z][A-Za-z0-9_]$") */]);
  // entryDate
  // admin
  // Address:
  street = new FormControl('', [Validators.required/* , Validators.pattern('[a-zA-Z0-9][ ]') */]);
  postalCode = new FormControl('', [Validators.required/* , Validators.pattern('[a-zA-Z0-9][ ]') */]);
  city = new FormControl('', [Validators.required/* , Validators.pattern("/^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/") */]);
  province = new FormControl('',[Validators.required/* , Validators.pattern('[a-zA-Z][ ]') */]);
  country = new FormControl('', [Validators.required/* , Validators.pattern('[a-zA-Z][ ]') */]);

  form: FormGroup;

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
            console.log('Dirección ' + address);
            console.log('ID Dirección: ' + address._id);
            let user = new User;
            user.firstName = this.user.firstName;
            user.lastName = this.user.lastName;
            user.email = this.user.email;
            user.password = this.user.password;
            user.username = this.user.username;
            user.entryDate = new Date;
            user.admin = false;
            user.addressId = address._id;
            console.log(user.addressId);
            this.userService.createUser(user)
            .then((user) => {
              console.log('Usuario' + user);
              let intermediate = new Intermediate;
              intermediate.userId = user._id;
              intermediate.collectionId = [];
              this.intermediateService.createIntermediate(intermediate)
              .then((intermediate) => {
                console.log('Intermediate ' + intermediate);
                console.log('Usuario creado');
                this.router.navigateByUrl('/home');
                this.dialog.open(LoginComponent);
                this.dialog2.open(CreatedAccountDialogComponent);
              })
            });
          }
        );
      }
  }

  goBack() {
    this.location.back();
  }

}

@Component({
  selector: 'dialog-content',
  template: '<h1 mat-dialog-title>Usuario Creado</h1><p mat-dialog-content><button (click)="closeDialog()">ACEPTAR</button></p>',
  styles: ['button { padding: 5px; color: white; background-color: cornflowerblue;} p { text-align: center;}']
})
export class CreatedAccountDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreatedAccountDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
  closeDialog(): void {
    this.dialogRef.close();
  }
}