import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Location } from '@momo-tracker/models';

@Component({
  selector: 'mt-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
})
export class AddLocationComponent {
  addForm = this.fb.nonNullable.group<Omit<Location, 'id'>>({
    name: '',
    numberOfParcels: 10,
  });

  constructor(
    private fb: FormBuilder,
  ) { }

  add() {

  }
}
