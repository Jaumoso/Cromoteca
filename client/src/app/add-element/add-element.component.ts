import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardService } from '../services/card.service';
import { Card } from '../shared/card';

export interface DialogData {
  userId: string;
  collectionId: string;
  card: Card;
}
@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.scss']
})
export class AddElementComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddElementComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { 
    this.form = this.formBuilder.group({
      cardId: this.cardId,
      name: this.name,
      repeated: this.repeated,
      description: this.description,
      // image
      state: this.state,
      price: this.price,
    })
  }

  // FORM VALIDATION
  cardId = new FormControl(null,[Validators.required]);
  name = new FormControl('',[Validators.required]);
  repeated = new FormControl(0, [Validators.required]);
  description = new FormControl('', [Validators.required]);
  // image
  state = new FormControl('',[Validators.required]);
  price = new FormControl(0, [Validators.required]);

  // VARIABLES
  errMsg = '';
  form: FormGroup;
  states: string[] = ['NUEVO','SEMINUEVO','GASTADO','ROTO'];

  ngOnInit(): void {
    // Vacío de forma intencional
  }

  onSubmit() {
    this.data.card.userId = this.data.userId;
    this.data.card.collectionId = this.data.collectionId;
    this.data.card.cardId = this.cardId.value!;
    this.data.card.name = this.name.value!;
    this.data.card.repeated = this.repeated.value!;
    this.data.card.description = this.description.value!;
    // image
    this.data.card.state = this.state.value!;
    this.data.card.price = this.price.value!;
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close(this.data);
  }

}
