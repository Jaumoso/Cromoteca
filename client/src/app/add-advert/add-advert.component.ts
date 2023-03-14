import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Advert } from '../shared/advert';
import { Card } from '../shared/card';

export interface DialogData {
  userId: string;
  collectionId: string;
  card: Card;
  advert: Advert;
}

@Component({
  selector: 'app-add-advert',
  templateUrl: './add-advert.component.html',
  styleUrls: ['./add-advert.component.scss']
})
export class AddAdvertComponent implements OnInit {

  form: FormGroup;
  states: string[] = ['NUEVO','SEMINUEVO','USADO','ROTO'];

  price = new FormControl(0, [Validators.required]);
  quantity = new FormControl(1, [Validators.required]);
  description = new FormControl('', [Validators.required, Validators.max(350)]);
  state = new FormControl('', [Validators.required]);

  constructor(
    private dialogRef: MatDialogRef<AddAdvertComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { 
    this.form = this.formBuilder.group({
      price: this.price,
      quantity: this.quantity,
      description: this.description,
      state: this.state,
    })
  }

  onSubmit(){
    if (this.price.value! < 0 || this.quantity.value! < 0) {
      let message = "";
      if (this.price.value! < 0) {
        message = "El precio no es válido. Asegúrate de que es un valor positivo.";
      } else {
        message = "La cantidad a vender no puede ser negativa.";
      }
    
      this.snackBar.open(message, "Aceptar", {
        verticalPosition: 'top',
        duration: 8000,
        panelClass: ['snackbar']
      });
    }
    // TODO: else if
  }

  closeDialog(): void {
    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {
    // Vacío de forma intencional
  }
}
