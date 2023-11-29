import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { LocationService } from '../../core/services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mt-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
})
export class AddLocationComponent {
  addForm = this.fb.group({
    name:  '',
    shortName: '',
    capacity: this.fb.group({
      small: 0,
      medium: 0,
      large: 0
    }),
  });

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private locationService: LocationService,
    private router: Router
  ) { }

  async add() {
    await this.locationService.add({ currentLoad: {small: 0, medium: 0, large: 0}, ...this.addForm.getRawValue() });
    this.router.navigate(['admin/locations'])
  }
}
