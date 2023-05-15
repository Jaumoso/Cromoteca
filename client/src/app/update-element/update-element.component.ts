import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from '../shared/card';

export interface DialogData {
  userId: string;
  collectionId: string;
  collectionSize: number;
  card: Card;
}

@Component({
  selector: 'app-update-element',
  templateUrl: './update-element.component.html',
  styleUrls: ['./update-element.component.scss']
})
export class UpdateElementComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<UpdateElementComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { 
    this.form = this.formBuilder.group({
      name: this.name,
      quantity: this.quantity,
      description: this.description,
      // image
      state: this.state,
      price: this.price,
    })
  }

  // FORM VALIDATION
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
    if (this.price.value! < 0 || this.quantity.value! < 1) {
      let message = "";
      if (this.price.value! < 0) {
        message = "El precio no es válido. Asegúrate de que es un valor positivo.";
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
    else {
      // se añade a la variable Card la información introducida en el formulario
      this.data.card.name = this.name.value!;
      this.data.card.quantity = this.quantity.value!;
      this.data.card.description = this.description.value!;
      // image
      this.data.card.state = this.state.value!;
      this.data.card.price = this.price.value!;
      this.closeDialog();
    }

  }

  closeDialog(): void {
    this.dialogRef.close(this.data);
  }
}
