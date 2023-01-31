import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  showSideNav = false;

  ngOnInit() {
  }

  openLoginForm() {
    this.dialog.open(LoginComponent);
    /* this.dialog.open(LoginComponent, { panelClass: 'login-form'}); */
  }
}