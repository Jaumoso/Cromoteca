import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Address } from '../shared/address';
import { AddressService } from '../services/address.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../collections/collections.component';

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
    private addressService: AddressService,
    private router: Router,
    public dialog: MatDialog,
    public dialog2: MatDialog
  ) {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required, Validators.pattern('[a-zA-Z ]'), Validators.minLength(2)],
      lastName: ['', Validators.required, Validators.pattern('[a-zA-Z ]'), Validators.minLength(2)],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(8)],
      password2: ['', Validators.required, Validators.minLength(8)],
      username: ['', Validators.required],
      // entryDate
      // admin
      // Address:
      street: ['', Validators.required, Validators.minLength(2)],
      postalCode: ['', Validators.required, Validators.pattern('[a-zA-Z0-9][ ]')],
      city: ['', Validators.required, Validators.pattern('[a-zA-Z][ ]')],
      province: ['', Validators.required, Validators.pattern('[a-zA-Z][ ]')],
      country: ['', Validators.required, Validators.pattern('[a-zA-Z][ ]')],
    });
   }

  ngOnInit(): void {
  }

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

  formErrors: any = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'passwordConfirmation': '',
    'username': '',
    // address
    'street': '',
    'postalCode': '',
    'city': '',
    'province': '',
    'country': '',
  };

  validationMessages: any = {
    'firstName': {
      'required': 'Nombre requerido',
      'minlength': 'Mínimo 2 caracteres',
      'pattern': 'No se admiten símbolos',
    },
    'lastName': {
      'required': 'Apellidos requeridos',
      'minlength': 'Mínimo 2 caracteres',
      'pattern': 'No se admiten símbolos',
    },
    'email': {
      'required': 'Correo requerido',
      'email': 'Formato email obligatorio',
    },
    'password': {
      'required': 'Contraseña requerida',
    },
    'passwordConfirmation': {
      'required': 'Confirma la contraseña',
    },
    'username': {
      'required': 'Usuario requerido',
      'minlength': 'Mínimo 2 caracteres',
      /* 'pattern': 'No se admiten símbolos', */
    },
    'street': {
      'required': 'Dirección requerida',
      'minlength': 'Mínimo 2 caracteres',
    },
    'postalCode': {
      'required': 'Código Postal requerido',
      'pattern': 'Solo letras y números',
    },
    'city': {
      'required': 'Ciudad requerida',
      'pattern': 'Solo letras',
    },
    'province': {
      'required': 'Provincia requerida',
      'pattern': 'Solo letras',
    },
    'country': {
      'required': 'País requerido',
      'pattern': 'Solo letras',
    },
  };

  onValueChanged(data?: any) {
    if (!this.form) { return;}
    const form = this.form;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
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
              console.log('Usuario creado');
              this.router.navigateByUrl('/home');
              this.dialog.open(LoginComponent);
              this.dialog2.open(CreatedAccountDialogComponent);
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