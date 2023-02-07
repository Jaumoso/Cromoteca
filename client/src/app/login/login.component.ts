import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginStatusService } from '../services/loginStatus.service';

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
    private loginStatusService: LoginStatusService
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

  form: FormGroup;

  ngOnInit() {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  setSession(token: string) {
    this.authService.setSession(token);
  }

  onSubmit() {
    if (this.user.username && this.user.password) {
      this.authService.login(this.user.username, this.user.password)
      .then(
        (token) => {
          console.log(token);
          console.log("User logged in successfully");
          if(token){
            this.router.navigateByUrl('/profile');
            this.loginStatusService.loggedIn = true;
            this.closeDialog();
          }
          this.setSession(token);
        }
      )
    }
  }
}