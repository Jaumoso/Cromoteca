import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Address } from '../shared/address';
import { AddressService } from '../services/address.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IntermediateService } from '../services/intermediate.service';
import { Intermediate } from '../shared/intermediate';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public dialog2: MatDialog,
    private snackBar: MatSnackBar
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
    },
    {
      validator: this.checkPasswords
    });
   }

  ngOnInit(): void {
    // Vacío de forma intencional
  }

  matcher = new MyErrorStateMatcher();

  firstName = new FormControl('', [Validators.required, /* Validators.pattern(/^\s*([a-zñA-ZÀ-ÿ]{1,}([\.,] |[-']| )?)+[a-zñA-ZÀ-ÿ]+\.?\s*$/g), */ Validators.minLength(2), Validators.maxLength(15)]);
  lastName = new FormControl('', [Validators.required,/* Validators.pattern(/^\s*([a-zñA-ZÀ-ÿ]{1,}([\.,] |[-']| )?)+[a-zñA-ZÀ-ÿ]+\.?\s*$/g), */ Validators.minLength(2), Validators.maxLength(25)]);
  email = new FormControl('', [ Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  passwordConfirmation = new FormControl('');
  username = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(18), /* Validators.pattern(/^[a-zA-Z0-9_-]$/g) */]);
  // entryDate
  // admin
  // Address:
  street = new FormControl('', [Validators.required , /* Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ.,\s,.]+[\d,\s]+$/g) */]);
  postalCode = new FormControl('', [Validators.required, /* Validators.pattern(/^[a-zA-Z0-9\-]+$/g) */]);  
  city = new FormControl('', [Validators.required, /* Validators.pattern(/^[a-zñA-ZÀ-ÿ ]+$/g) */]);
  province = new FormControl('',[Validators.required, /* Validators.pattern(/^[a-zñA-ZÀ-ÿ ]+$/g) */]);
  country = new FormControl('', [Validators.required, /* Validators.pattern(/^[a-zñA-ZÀ-ÿ ]+$/g) */]);

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')!.value;
    let confirmPass = group.get('passwordConfirmation')!.value
    return pass === confirmPass ? null : { notSame: true }
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

  onSubmit() {
    // Comporbar que los campos están completos
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
        // Comprobación de que el usuario no existe ya en la BD
        this.userService.checkExistingUser(this.user.username, this.user.email)
        .then((existingUser) => {
          // Si el usuario existe
          if(existingUser){
            this.snackBar.open(
              "Nombre de usuario / correo electrónico no disponible", 
              "Aceptar",
              {
                verticalPosition: 'top',
                duration: 8000,
                panelClass: ['snackbar']
              }
              );
          // si el usuario no existe
          }else{
            let address = new Address;
            address.street = this.user.address.street;
            address.postalCode = this.user.address.postalCode;
            address.city = this.user.address.city;
            address.province = this.user.address.province;
            address.country = this.user.address.country;
            // Se crea la address
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
                // Se crea el usuario
                this.userService.createUser(user)
                .then((user) => {
                  console.log('Usuario' + user);
                  let intermediate = new Intermediate;
                  intermediate.userId = user._id;
                  intermediate.collectionId = [];
                  // Se crea la tabla intermediate
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
        })
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
  ) {}
  closeDialog(): void {
    this.dialogRef.close();
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}