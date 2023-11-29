import { Location, Parcel, UniqNumber } from '@momo-tracker/models';
import { Dexie, Table } from 'dexie';

export class AppDB extends Dexie {
  locations!: Table<Location, number>;
  parcels!: Table<Parcel, number>;
  uniqNumbers!: Table<UniqNumber, number>;

  constructor() {
    super('momo');
    this.version(1).stores({
      locations: '++id, name, shortName, capacity.small, capacity.medium, capacity.large, currentLoad.small, currentLoad.medium, currentLoad.large',
      parcels: '++id, uniqNumber, size, receivedAt, locationId, recipient.firstName, recipient.lastName, image, uniqNumber',
      uniqNumbers: '++id, shortName, uniqNumber, available',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {

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
