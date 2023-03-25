import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { CloseSessionDialogComponent } from '../close-session-dialog/close-session-dialog.component';
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
      if(!this.jwtService.isTokenExpired(this.token)){
        this.decodedToken = this.jwtService.decodeToken(this.token);
      }
      else{
        this.router.navigateByUrl('/home');
      }
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
      this.dialog.open(CloseSessionDialogComponent)
      this.loginStatusService.loggedIn = false;
      this.router.navigateByUrl('/home');
      this.authService.closeSession();
    }

}