import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';
import { User } from '../shared/user';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    /* @Inject('BaseURL') private BaseURL */
    ){
    this.createForm();
  }

  errMsg: string | undefined; // TODO:
  updateForm: FormGroup | undefined;
  user: User | undefined;
  updatedUser: User | undefined;

  formErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'username': '',
    //address
    'street': '',
    'postalCode': '',
    'city': '',
    'province': '',
    'country': ''
  };

  validationMessages = {
    'firstName': {
      'required': 'Campo obligatorio.',
      'minlength': 'Mínimo 2 caracteres.',
      'pattern': 'Símbolos y números no permitidos.'
    },
    'lastName': {
      'required': 'Campo obligatorio.',
      'minlength': 'Mínimo 2 caracteres.',
      'pattern': 'Símbolos y números no permitidos.'
    },
    //'email'
    'password': {
      'required': 'Campo obligatorio.',
      'minlength': 'Mínimo 8 caracteres.',
    },
    //'username'
    //'entryDate'
    'street': {
      'required': 'Campo obligatorio.',
    },
    'postalCode': {
      'required': 'Campo obligatorio.',
    },
    'city': {
      'required': 'Campo obligatorio.',
      'minlength': 'Mínimo 2 caracteres.',
      'pattern': 'Símbolos y números no permitidos.'
    },
    'province': {
      'required': 'Campo obligatorio.',
      'minlength': 'Mínimo 2 caracteres.',
      'pattern': 'Símbolos y números no permitidos.'
    },
    'country': {
      'required': 'Campo obligatorio.',
      'minlength': 'Mínimo 2 caracteres.',
      'pattern': 'Símbolos y números no permitidos'
    }
  };

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
      
  }

  createForm(){
    
  }


}
