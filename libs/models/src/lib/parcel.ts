import { Location } from './location';

export interface Parcel {
  id?: number;
  locationId: number;
  location?: Location;
  recipient: {
    firstName: string;
    lastName: string;
  };
  receivedAt: Date;
  deliveredAt?: Date;
}
