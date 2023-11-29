import { Injectable } from '@angular/core';
import { db } from '@momo-tracker/database';
import { Parcel } from '@momo-tracker/models';

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

      for (const parcel of parcels) {
        const parcelLocation = await db.locations.get({
          id: parcel.locationId,
        });
        parcel.location = parcelLocation;
      }

      console.log(parcels);

      return parcels;
    });
  }

  async add(parcel: Parcel, parcelNumber: number) {
    return db.transaction('rw', db.locations, db.parcels, db.uniqNumbers, async () => {
      const location = await db.locations.where({ id: parcel.locationId }).first();

      if (!location) {
        throw new Error('Unable to find location')
      }

      // Mise à jour de la zone
      location.currentLoad[parcel.size]++;

      await db.locations.update(location.id!, { currentLoad: location.currentLoad });

      const uniqNumber = await db.uniqNumbers.where({ shortName: location.shortName, uniqNumber: parcelNumber }).first();
      let newUniqNumber;

      if (uniqNumber) {
        newUniqNumber = {...uniqNumber, available: false}
      }
      else {
        newUniqNumber = {shortName: location.shortName, uniqNumber: parcelNumber, available: false}
      }

      await db.uniqNumbers.put(newUniqNumber)

      // Ajout du colis
      await db.parcels.add(parcel);
    });
  }
}
