import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { AddressService } from '../services/address.service';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';
import { LoginStatusService } from '../services/loginStatus.service';
import { UserService } from '../services/user.service';
import { Address } from '../shared/address';
import { User } from '../shared/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router,
    private jwtService: JwtService,
    private authService: AuthService,
    private loginStatusService: LoginStatusService,
    public dialog: MatDialog,
    ) { }

  user: User | undefined;
  address: Address | undefined;
  private token: any;
  private decodedToken: any;

  async ngOnInit() {

    this.token = localStorage.getItem('token');
    if (this.token) {
      this.decodedToken = this.jwtService.decodeToken(this.token);
    }
    
    // GET User y Address
    this.route.paramMap.pipe(
      mergeMap(() => { return this.userService.getUser(this.decodedToken._id) }),
      mergeMap((userData) => { this.user = userData; return this.addressService.getAddress(this.decodedToken.addressId)}))
      .subscribe(addressData => {
        this.address = addressData;
      });
    }

    logOut(){
      this.dialog.open(CloseSessionDialog)
      this.loginStatusService.loggedIn = false;
      this.router.navigateByUrl('/home');
      this.authService.closeSession();
    }

}

@Component({
  selector: 'close-session-dialog',
  template: '<h1 mat-dialog-title>Sesión Cerrada</h1><p mat-dialog-content><button (click)="closeDialog()">ACEPTAR</button></p>',
  styles: ['button { padding: 5px; color: white; background-color: cornflowerblue;} p { text-align: center;}']
})
export class CloseSessionDialog {
  constructor(private dialogRef: MatDialogRef<CloseSessionDialog>) {}

  closeDialog(){
    this.dialogRef.close();
  }
}
