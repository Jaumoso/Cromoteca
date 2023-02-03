import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { DialogData } from '../collections/collections.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
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
    private loginStatusService: LoginStatusService) { }

    loginSubscription: Subscription | undefined;
    loggedIn: boolean = false;
    

  ngOnInit() {
    this.loginSubscription = this.loginStatusService.loginChanges.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }

  goToProfile(){
    if(localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/profile');
    }
    else {
      this.openLoginForm();
    }
  }

  logOut(){
    this.dialog.open(CloseSessionDialog)
    if(this.router.url == '/profile'){
      this.router.navigateByUrl('/home');
    }
    this.authService.closeSession();
    this.loggedIn = false;
  }

  openLoginForm() {
    this.dialog.open(LoginComponent);
    /* this.dialog.open(LoginComponent, { panelClass: 'login-form'}); */
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