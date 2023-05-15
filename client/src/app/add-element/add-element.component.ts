import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from '../shared/card';

export interface DialogData {
  userId: string;
  collectionId: string;
  collectionSize: number;
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
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { 
    this.form = this.formBuilder.group({
      cardId: this.cardId,
      name: this.name,
      quantity: this.quantity,
      description: this.description,
      // image
      state: this.state,
      price: this.price,
    })
  }

  // FORM VALIDATION
  cardId = new FormControl(null,[Validators.required]);
  name = new FormControl('',[Validators.required]);
  quantity = new FormControl(1, [Validators.required]);
  description = new FormControl('');
  // image
  state = new FormControl('',[Validators.required]);
  price = new FormControl(0, [Validators.required]);

  // VARIABLES
  form: FormGroup;
  states: string[] = ['NUEVO','SEMINUEVO','USADO','ROTO'];

  ngOnInit(): void {
    // Vacío de forma intencional
  }

  onSubmit() {
    if (this.price.value! < 0 || this.quantity.value! < 1 || this.cardId.value! < 1) {
      let message = "";
      if (this.price.value! < 0) {
        message = "El precio no es válido. Asegúrate de que es un valor positivo.";
      } 
      else if(this.cardId.value! < 0) {
        message = "El identificador del elemento no puede ser 0 ni negativo.";
      }
      else {
        message = "La cantidad que tienes no puede ser 0 ni negativa.";
      }
    
      this.snackBar.open(message, "Aceptar", {
        verticalPosition: 'top',
        duration: 8000,
        panelClass: ['snackbar']
      });
    }
    else if(this.cardId.value! <= this.data.collectionSize){
      // se añade a la variable Card la información introducida en el formulario
      this.data.card.userId = this.data.userId;
      this.data.card.collectionId = this.data.collectionId;
      this.data.card.cardId = this.cardId.value!;
      this.data.card.name = this.name.value!;
      this.data.card.quantity = this.quantity.value!;
      this.data.card.description = this.description.value!;
      // image
      this.data.card.state = this.state.value!;
      this.data.card.price = this.price.value!;
      this.closeDialog();
    }
    else{
      this.snackBar.open(
        "El identificador no puede ser mayor al tamaño de la colección: " + this.data.collectionSize, 
        "Aceptar",
        {
          verticalPosition: 'top',
          duration: 8000,
          panelClass: ['snackbar']
        }
      );
    }

  }

  closeDialog(): void {
    this.dialogRef.close(this.data);
  }
}
