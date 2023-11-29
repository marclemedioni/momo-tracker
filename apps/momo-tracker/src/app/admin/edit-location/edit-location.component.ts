import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { LocationService } from '../../core/services/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@momo-tracker/models';

@Component({
  selector: 'mt-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss'],
})
export class EditLocationComponent implements OnInit {
  private location!: Location
  editForm = this.fb.group({
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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.location = this.route.snapshot.data['location'] as Location

    const { id: _, ...locationWithoutId } = this.location;
    this.editForm.setValue(locationWithoutId)
  }

  async update() {
    await this.locationService.update({ id: this.location.id, currentLoad: this.location.currentLoad, ...this.editForm.getRawValue() });
    this.router.navigate(['admin/locations'])
  }
}
