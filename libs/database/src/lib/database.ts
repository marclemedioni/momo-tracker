import { Location, Parcel } from '@momo-tracker/models';
import { Dexie, Table } from 'dexie';

export class AppDB extends Dexie {
  locations!: Table<Location, number>;
  parcels!: Table<Parcel, number>;

  constructor() {
    super('momo');
    this.version(1).stores({
      locations: '++id',
      parcels: '++id, recipient.lastName',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    const locationId = await db.locations.add({
      name: 'populated',
      numberOfParcels: 42,
    });
    await db.parcels.bulkAdd([
      {
        locationId,
        recipient: {
          firstName: 'Yves',
          lastName: 'Atrovite',
        },
        receivedAt: new Date(),
      },
      {
        locationId,
        recipient: {
          firstName: 'Tata',
          lastName: 'Yvette',
        },
        receivedAt: new Date(),
      },
    ]);
  }

  async resetDatabase() {
    await db.transaction('rw', 'locations', 'parcels', () => {
      this.locations.clear();
      this.parcels.clear();
      this.populate();
    });
  }
}

export const db = new AppDB();
