import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.scss']
})
export class PasswordchangeComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private userService: UserService
  ) { 
    this.sendEmailForm = this.formBuilder.group({
      email: this.emailValidation,
    });
    this.checkCodeForm = this.formBuilder.group({
      code: this.codeValidation,
    });
  }

  ngOnInit(): void {

  }

  emailValidation = new FormControl('', [Validators.required, Validators.email]);
  codeValidation = new FormControl('', [Validators.required]);
  sendEmailForm: FormGroup;
  checkCodeForm: FormGroup;
  code: string | undefined;

  sendEmail() {
    console.log(this.sendEmailForm.value.email);
    this.userService.checkEmail(this.sendEmailForm.value.email)
    .then((userExists) => {
      if(userExists){
        // FALTA IMPLEMENTAR
      }
    });
  }

  checkCode() {
    console.log(this.checkCodeForm.value.code);
  }

  goBack() {
    this.location.back();
  }

  generateCode(){
    let token: string = '';
    for(var i=0; i < 10; i++){
      token = token + Math.random().toString();
    }
    return token;
  }
}
