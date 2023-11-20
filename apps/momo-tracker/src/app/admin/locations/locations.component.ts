import { Component } from '@angular/core';
import { Location } from '@momo-tracker/models';
import { liveQuery } from 'dexie';
import { LocationService } from '../../core/services/location.service';

@Component({
  selector: 'mt-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent {
  locations$ = liveQuery(() => this.locationService.getAll());

  constructor(private locationService: LocationService) {

  }

   refreshLocations() {
    this.locations$ = liveQuery(() => this.locationService.getAll());
   }

  remove(location: Location) {
    console.log(location)
  }
}
