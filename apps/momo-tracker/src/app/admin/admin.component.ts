import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Location } from '@momo-tracker/models';
import { liveQuery } from 'dexie';
import { of, switchMap } from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../core/components/confirm-dialog/confirm-dialog.component';
import { LocationService } from '../core/services/location.service';
import { AddLocationComponent } from './add-location/add-location.component';

@Component({
  selector: 'mt-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  hasAccess = true;
  locations$ = liveQuery(() => this.locationService.getAll());
  addLocationDialogRef!: MatDialogRef<AddLocationComponent, Location>;

  constructor(
    private locationService: LocationService,
    public dialog: MatDialog
  ) {}

  onCodeCompleted(code: string) {
    if (code === '1234') {
      this.hasAccess = true;
    }
  }

  refreshLocations() {
    this.locations$ = liveQuery(() => this.locationService.getAll());
  }

  addLocation() {
    this.addLocationDialogRef = this.dialog.open(AddLocationComponent);
    this.addLocationDialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (result) {
            return this.locationService.addLocation(result);
          } else {
            return of(null);
          }
        })
      )
      .subscribe(() => {
        this.refreshLocations();
      });
  }

  remove(location: Location) {
    const dialogData = new ConfirmDialogModel(
      'Confirmation',
      `Supprimer l'emplacement ${location.name} ?`
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(async (dialogResult) => {
      if (dialogResult && location.id) {
        await this.locationService.removeLocationById(location.id);

        this.refreshLocations();
      }
    });
  }
}
