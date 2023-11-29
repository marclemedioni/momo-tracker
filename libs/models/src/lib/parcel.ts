import { Location } from './location';

export interface Parcel {
  id?: number;
  locationId: number;
  location?: Location;
  size: 'small' | 'medium' | 'large';
  recipient: {
    firstName: string;
    lastName: string;
  };
  receivedAt: Date;
  deliveredAt?: Date;
  uniqNumber: string;
}
