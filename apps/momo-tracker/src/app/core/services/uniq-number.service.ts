import { Injectable } from '@angular/core';
import { db } from '@momo-tracker/database';

@Injectable({
  providedIn: 'root'
})
export class UniqNumberService {

  constructor() { }

  async getFirstAvailable(shortName: string) {
    const numbers = await db.uniqNumbers.where({ shortName }).toArray();

    if (numbers.length === 0) {
      return 1
    }
    else {
      // TODO: Check if there is a hole in array
      return numbers.length + 1
   }
  }
}
