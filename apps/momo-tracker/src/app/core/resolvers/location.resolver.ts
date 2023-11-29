import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { LocationService } from '../services/location.service';
import { Location } from '@momo-tracker/models';

export const LocationResolver: ResolveFn<Location | undefined> = (
  route: ActivatedRouteSnapshot
) => inject(LocationService).getById(+route.paramMap.get('id')!)
