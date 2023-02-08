import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';
import { User } from '../shared/user';
import { AddressService } from '../services/address.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from '../shared/address';
import { JwtService } from '../services/jwt.service';
import { mergeMap } from 'rxjs';
import { DialogData } from '../collections/collections.component';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private addressService: AddressService,
    private router: Router,
    public dialog: MatDialog,
    private jwtService: JwtService,
    private route: ActivatedRoute,
    ){
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
        street: ['', Validators.required],
        postalCode: ['', Validators.required, Validators.pattern('[a-zA-Z0-9][ ]')],
        city: ['', Validators.required, Validators.pattern('[a-zA-Z][ ]')],
        province: ['', Validators.required, Validators.pattern('[a-zA-Z][ ]')],
        country: ['', Validators.required, Validators.pattern('[a-zA-Z][ ]')],
      });
  }

  ngOnInit(): void {
      
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.decodedToken = this.jwtService.decodeToken(this.token);
    }

    // GET User y Address
    this.route.paramMap.pipe(
      mergeMap(() => { return this.userService.getUser(this.decodedToken._id) }),
      mergeMap((userData) => { 
        this.user = userData; 
        return this.addressService.getAddress(this.decodedToken.addressId)}))
      .subscribe(addressData => {
        this.address = addressData;
      });
  }

  private token: any;
  private decodedToken: any;
  form: FormGroup;
  errMsg: string | undefined; // TODO:
  updateForm: FormGroup | undefined;
  user: User | undefined;
  address: Address | undefined;

  updatedUser = {
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
    'username': '',
    //address
    'street': '',
    'postalCode': '',
    'city': '',
    'province': '',
    'country': ''
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

    this.addressService.updateAddress(this.user!.addressId!, this.address!);
    this.userService.updateUser(this.user!._id!, this.user!)
    .then((user) => {
      console.log('Usuario' + user);
      console.log('Usuario creado');
      this.router.navigateByUrl('/profile');
      this.dialog.open(UpdatedProfileComponent);
    });
  
  }

  goBack() {
    this.location.back();
  }
}

@Component({
  selector: 'dialog-content',
  template: '<h1 mat-dialog-title>Usuario Actualizado</h1><p mat-dialog-content><button (click)="closeDialog()">ACEPTAR</button></p>',
  styles: ['button { padding: 5px; color: white; background-color: cornflowerblue;} p { text-align: center;}']
})
export class UpdatedProfileComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdatedProfileComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
  closeDialog(): void {
    this.dialogRef.close();
  }
}