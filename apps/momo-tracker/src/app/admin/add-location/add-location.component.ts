import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Location } from '@momo-tracker/models';

@Component({
  template: `
    <h1 mat-dialog-title>Ajouter un emplacement</h1>
    <form [formGroup]="addForm" (ngSubmit)="add()">
      <mat-dialog-content>
        <mat-form-field appearance="outline">
          <mat-label>Nom</mat-label>
          <input type="text" matInput formControlName="name" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Nombre de colis</mat-label>
          <input type="number" matInput formControlName="numberOfParcels" />
        </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button>Annuler</button>
        <button type="submit" mat-raised-button color="primary">Ajouter</button>
      </mat-dialog-actions>
    </form>
  `,
})
export class AddLocationComponent {
  addForm = this.fb.nonNullable.group<Omit<Location, 'id'>>({
    name: '',
    numberOfParcels: 10,
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddLocationComponent>
  ) {}

  add() {
    this.dialogRef.close(this.addForm.value);
  }
}
