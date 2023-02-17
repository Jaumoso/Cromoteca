import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, } from '@angular/router';
import { Subscription } from 'rxjs';
import { CloseSessionDialogComponent } from '../close-session-dialog/close-session-dialog.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';
import { LoginStatusService } from '../services/loginStatus.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private loginStatusService: LoginStatusService,
    private jwtService: JwtService) { }

    loginSubscription: Subscription | undefined;
    loggedIn: boolean | undefined;
    

  ngOnInit() {
    this.loginSubscription = this.loginStatusService.loginChanges.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }

  goToProfile(){
    const token = localStorage.getItem('token');
    if(token != null) {
      if(this.jwtService.isTokenExpired(token) == false){
        this.router.navigateByUrl('/profile');
      }
      else {
        this.openLoginForm();
      }
    }
    else {
      this.openLoginForm();
    }
  }

  logOut(){
    this.dialog.open(CloseSessionDialogComponent)
    if(this.router.url == '/profile'){
      this.router.navigateByUrl('/home');
    }
    this.authService.closeSession();
    this.loggedIn = false;
  }

  openLoginForm() {
    this.dialog.open(LoginComponent);
  }
}