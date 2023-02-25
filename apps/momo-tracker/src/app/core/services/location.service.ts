import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private dataBase: NgxIndexedDBService) {}

  getAll() {
    return this.dataBase.getAll('locations');
  }

  // TODO Add types
  addLocation(location: any) {
    return this.dataBase.add('locations', location);
  }

  removeLocationById(locationId: number) {
    return this.dataBase.deleteByKey('locations', locationId);
  }
}
