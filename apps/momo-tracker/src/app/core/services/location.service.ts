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

  getById(locationId: number) {
    return db.locations.get(locationId)
  }

  add(location: Location) {
    return db.locations.add(location);
  }

  update(location: Location) {
    if (!location.id) {
      throw new Error("Unable to update location without ID")
    }

    return db.locations.update(location.id, location)
  }

  removeById(locationId: number) {
    return db.locations.delete(locationId);
  }
}
