import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';
import { User } from '../shared/user';
import { AddressService } from '../services/address.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
        this.user.password = '';
        return this.addressService.getAddress(this.decodedToken.addressId)}))
      .subscribe(addressData => {
        this.address = addressData;
      });

  }

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