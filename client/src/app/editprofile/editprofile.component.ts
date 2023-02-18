import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';
import { User } from '../shared/user';
import { AddressService } from '../services/address.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Address } from '../shared/address';
import { JwtService } from '../services/jwt.service';
import { mergeMap } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';

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
    public dialog2: MatDialog,
    private jwtService: JwtService,
    private route: ActivatedRoute,
    private authService: AuthService
    ){
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
      
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.decodedToken = this.jwtService.decodeToken(this.token);
    }

    // GET User y Address
    this.route.paramMap.pipe(
      mergeMap(() => { return this.userService.getUser(this.decodedToken._id) }),
      mergeMap((userData) => { 
        this.user = userData;
        this.user.password = '';
        return this.addressService.getAddress(this.decodedToken.addressId)}))
      .subscribe(addressData => {
        this.address = addressData;
      });

  }

  firstName = new FormControl('', [Validators.required, /* Validators.pattern("/^[a-z ,.'-]+$/i"), */ Validators.minLength(4)]);
  lastName = new FormControl('', [/* Validators.pattern("/^[a-z ,.'-]+$/i"), */ Validators.minLength(2)]);
  email = new FormControl('', [ Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8), /* this.passwordMatchValidator */]);
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

/*   passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const passwordConfirmation = group.get('passwordConfirmation')?.value;
    // Check if both password and passwordConfirmation have values before comparing
    if (password != null && passwordConfirmation != null) {
        return password === passwordConfirmation ? null : { 'mismatch': true };
    }
    // Return null if either password or passwordConfirmation is null
    return null;
  } */

  private token: any;
  private decodedToken: any;
  form: FormGroup;
  updateForm: FormGroup | undefined;
  user: User | undefined;
  address: Address | undefined;
  confirmPassword: string | undefined;

  onSubmit() {

    this.addressService.updateAddress(this.user!.addressId!, this.address!);
    this.userService.updateUser(this.user!._id!, this.user!)
    .then((user) => {
      console.log(user);
      this.router.navigateByUrl('/home');
      this.authService.closeSession();
      this.dialog2.open(LoginComponent);
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
  ) {}
  closeDialog(): void {
    this.dialogRef.close();
  }
}