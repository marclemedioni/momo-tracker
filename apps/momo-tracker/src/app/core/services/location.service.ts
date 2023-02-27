import { Injectable } from '@angular/core';
import { db } from '@momo-tracker/database';
import { Location } from '@momo-tracker/models';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  getAll() {
    return db.locations.toArray();
  }

  addLocation(location: Location) {
    return db.locations.add(location);
  }

  removeLocationById(locationId: number) {
    return db.locations.delete(locationId);
  }
}
