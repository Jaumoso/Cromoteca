import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    private authService: AuthService,
    private loginStatusService: LoginStatusService,
    private snackBar: MatSnackBar
    ) { 
      this.form = this.formBuilder.group({
        username: this.username,
        password: this.password
      });
    }

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  errMsg = '';
  form: FormGroup;

  ngOnInit() {
    // Vacío de forma intencional
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.username.value && this.password.value) {
      this.authService.login(this.username.value, this.password.value)
      .then(
        (token) => {
          console.log(token);
          console.log("User logged in successfully");
          if(token){
            this.loginStatusService.loggedIn = true;
            this.closeDialog();
          }
          this.authService.setSession(token);

          this.snackBar.open(
            "Sesión Iniciada", 
            "Aceptar",
            {
              verticalPosition: 'top',
              duration: 4000,
              panelClass: ['snackbar']
            }
            );
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