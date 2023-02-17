import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginStatusService } from '../services/loginStatus.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loginStatusService: LoginStatusService,
    private snackBar: MatSnackBar
    ) { 
      this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  
  user = {
    username: '',
    password: '',
  };
  errMsg = '';
  form: FormGroup;

  ngOnInit() {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.user.username && this.user.password) {
      this.authService.login(this.user.username, this.user.password)
      .then(
        (token) => {
          console.log(token);
          console.log("User logged in successfully");
          if(token){
            /* this.router.navigateByUrl('/profile'); */
            this.loginStatusService.loggedIn = true;
            this.closeDialog();
          }
          this.authService.setSession(token);
        }
      ).catch(() => {
        this.snackBar.open(
          "Usuario o contraseña incorrectos", 
          "Aceptar",
          {
            verticalPosition: 'top',
            duration: 6000,
            panelClass: ['snackbar']
          }
          );

      });
    }
  }
}