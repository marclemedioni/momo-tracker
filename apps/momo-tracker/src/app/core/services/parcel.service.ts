import { Injectable } from '@angular/core';
import { db } from '@momo-tracker/database';

@Injectable({
  providedIn: 'root',
})
export class ParcelService {
  constructor() {}

  async search(lastName: string) {
    return db.transaction('r', [db.parcels, db.locations], async () => {
      const parcels = await db.parcels
        .where('recipient.lastName')
        .startsWithAnyOfIgnoreCase(lastName)
        .toArray();

      for (let parcel of parcels) {
        const parcelLocation = await db.locations.get({
          id: parcel.locationId,
        });
        parcel.location = parcelLocation;
      }

      console.log(parcels);

      return parcels;
    });
  }
}
