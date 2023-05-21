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
  http: any;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private userService: UserService,
  ) { 
    this.sendEmailForm = this.formBuilder.group({
      email: this.emailValidation,
    });
    this.checkCodeForm = this.formBuilder.group({
      code: this.codeValidation,
    });
  }

  ngOnInit(): void {
    // Vacío de forma intencional
  }

  emailValidation = new FormControl('', [Validators.required, Validators.email]);
  codeValidation = new FormControl('', [Validators.required]);
  sendEmailForm: FormGroup;
  checkCodeForm: FormGroup;
  emailButton: boolean | undefined;
  private code: string | undefined;

  sendEmail() {
    if(this.sendEmailForm.valid){
    this.userService.checkEmail(this.sendEmailForm.value.email)
    .then((userExists) => {
      if(userExists){
        this.emailButton = true;
        
        this.code = this.generateCode();
        // TODO: enviar código vía SMTP
      }
    })
    .catch((error) => {console.error(error);});
    }
  }

  goBack() {
    this.location.back();
  }

  generateCode() {
    return crypto.randomUUID().toString();
  }

  checkCode(){
    if(this.code == this.codeValidation.value){ return true; }
    else return false;
  }

}
