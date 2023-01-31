import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
    private authService: AuthService
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

  ngOnInit() {

  }

  onClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.user.username && this.user.password) {
      const user = { username: this.user.username, password: this.user.password };
      this.authService.login(user)
      .then(
        (user) => {
          console.log("User logged in successfully");
          this.router.navigateByUrl('/home');
          if(user){
            this.onClick();
          }
        }
      )
    }
  }
}