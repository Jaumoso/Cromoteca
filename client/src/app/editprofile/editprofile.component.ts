import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
import { ErrorStateMatcher } from '@angular/material/core';

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
      },
      {
        validator: this.checkPasswords
      });
  }
  matcher = new MyErrorStateMatcher();

  firstName = new FormControl('', [Validators.required, Validators.pattern(/^\s*([a-zñA-ZÀ-ÿ]{1,}([\.,] |[-']| )?)+[a-zñA-ZÀ-ÿ]+\.?\s*$/g), Validators.minLength(2), Validators.maxLength(15)]);
  lastName = new FormControl('', [Validators.pattern(/^\s*([a-zñA-ZÀ-ÿ]{1,}([\.,] |[-']| )?)+[a-zñA-ZÀ-ÿ]+\.?\s*$/g), Validators.minLength(2), Validators.maxLength(25)]);
  email = new FormControl('', [ Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8), /* this.passwordMatchValidator */]);
  passwordConfirmation = new FormControl('');
  username = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(18), Validators.pattern(/^[a-zA-Z0-9_-]{1,}$/g)]);
  // entryDate
  // admin
  // Address:
  street = new FormControl('', [Validators.required , Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ.,\s,.]+[\d,\s]+$/g)]);
  postalCode = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\-]+$/g)]);  
  city = new FormControl('', [Validators.required, Validators.pattern(/^[a-zñA-ZÀ-ÿ ]+$/g)]);
  province = new FormControl('',[Validators.required, Validators.pattern(/^[a-zñA-ZÀ-ÿ ]+$/g)]);
  country = new FormControl('', [Validators.required, Validators.pattern(/^[a-zñA-ZÀ-ÿ ]+$/g)]);

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')!.value;
    let confirmPass = group.get('passwordConfirmation')!.value
    return pass === confirmPass ? null : { notSame: true }
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

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}