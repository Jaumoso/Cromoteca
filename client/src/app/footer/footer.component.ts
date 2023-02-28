import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private jwtService: JwtService,
    private router: Router,
    private dialog: MatDialog
  ){}
  ngOnInit(): void {
    // Vacío de forma intencional
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

  openLoginForm() {
    this.dialog.open(LoginComponent);
  }
}