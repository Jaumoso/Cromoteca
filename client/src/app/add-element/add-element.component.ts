import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.scss']
})
export class AddElementComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddElementComponent>,
    private formBuilder: FormBuilder,
    private cardService: CardService,
    private snackBar: MatSnackBar
  ) { 
    this.form = this.formBuilder.group({
      cardId: ['', Validators.required],
      name: ['', Validators.required],
      repeated: ['', Validators.required],
      description: ['', Validators.required],
      // image: ['', Validators.required],
    })
  }
  errMsg = '';
  form: FormGroup;

  ngOnInit(): void {
  }

}
