import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';
import { User } from '../shared/user';
import { AddressService } from '../services/address.service';
import { MatDialog } from '@angular/material/dialog';
import { Address } from '../shared/address';
import { JwtService } from '../services/jwt.service';
import { mergeMap } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
    private addressService: AddressService,
    private accountService: AccountService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
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

  firstName = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]);
  lastName = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]);
  email = new FormControl('', [ Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  passwordConfirmation = new FormControl('');
  username = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(18)]);
  // entryDate
  // admin
  // Address:
  street = new FormControl('', [Validators.required]);
  postalCode = new FormControl('', [Validators.required]);  
  city = new FormControl('', [Validators.required]);
  province = new FormControl('',[Validators.required]);
  country = new FormControl('', [Validators.required]);

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')!.value;
    let confirmPass = group.get('passwordConfirmation')!.value
    return pass === confirmPass ? null : { notSame: true }
  }


  ngOnInit(): void {
      
    const token = localStorage.getItem('token');
    if (token) {
      if(!this.jwtService.isTokenExpired(token)){
        this.decodedToken = this.jwtService.decodeToken(token);
      }
      else{
          this.router.navigateByUrl('/home');
      }
    }

    // GET User y Address

    this.userService.getUser(this.decodedToken._id)
    .then((userData) => {
      this.user = userData;
      this.user.password = '';
    });
    this.addressService.getAddress(this.decodedToken.addressId)
    .then((addressData) => {
      this.address = addressData;
    });
  }

  private decodedToken: any;
  form: FormGroup;
  updateForm: FormGroup | undefined;
  user: User | undefined;
  address: Address | undefined;
  confirmPassword: string | undefined;

  onSubmit() {
    // Se actualiza la información de la cuenta.
    this.accountService.updateAccount(this.user?.addressId!, this.address!, this.user?._id!, this.user!)
    .then(() => {
      this.router.navigateByUrl('/home');
      this.authService.closeSession();
      this.dialog.open(LoginComponent);
      this.snackBar.open(
        "Datos de usuario actualizados.", 
        "Aceptar",
        {
          verticalPosition: 'top',
          duration: 8000,
          panelClass: ['snackbar']
        }
        );
    });
  }

  deleteAccount(){
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent, {
      data: { deleteAccount: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.deleteAccount){
        // Se borra la cuenta y tods su información
        this.accountService.deleteAccount(this.user!._id!, this.user!.addressId!)
        .then(() => {
          this.router.navigateByUrl('/home');
          this.snackBar.open(
            "Datos de usuario actualizados.", 
            "Aceptar",
            {
              verticalPosition: 'top',
              duration: 8000,
              panelClass: ['snackbar']
            }
            );
        });
      }
    });
  }

  goBack() {
    this.location.back();
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}
