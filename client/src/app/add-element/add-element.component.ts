import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardService } from '../services/card.service';
import { Card } from '../shared/card';

export interface DialogData {
  userId: string;
  collectionId: string;
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
    private cardService: CardService,
    private snackBar: MatSnackBar,
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
  price = new FormControl(null, [Validators.required]);

  // VARIABLES
  errMsg = '';
  form: FormGroup;
  states: string[] = ['NUEVO','SEMINUEVO','GASTADO','ROTO'];

  ngOnInit(): void {
    // Vacío de forma intencional
  }

  onSubmit() {
    let card = new Card;

    card.userId = this.data.userId;
    card.collectionId = this.data.collectionId;
    card.cardId = this.cardId.value!;
    card.name = this.name.value!;
    card.repeated = this.repeated.value!;
    card.description = this.description.value!;
    // image
    card.state = this.state.value!;
    card.price = this.price.value!;
    
    this.cardService.createCard(card)
    .then((card) => {{
      console.log(card);
      this.snackBar.open(
        "Elemento añadido a la colección", 
        "Aceptar",
        {
          verticalPosition: 'top',
          duration: 6000,
          panelClass: ['snackbar']
        }
        );
    }}).finally(() => {
      this.closeDialog();
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
