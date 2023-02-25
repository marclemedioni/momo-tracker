import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, switchMap } from 'rxjs';
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
  locations$!: Observable<Array<any>>;
  addLocationDialogRef!: MatDialogRef<AddLocationComponent>;

  constructor(
    private locationService: LocationService,
    public dialog: MatDialog
  ) {
    this.refreshLocations();
  }

  onCodeCompleted(code: string) {
    if (code === '1234') {
      this.hasAccess = true;
    }
  }

  refreshLocations() {
    this.locations$ = this.locationService.getAll();
  }

  addLocation() {
    this.addLocationDialogRef = this.dialog.open(AddLocationComponent);
    this.addLocationDialogRef
      .afterClosed()
      .pipe(
        switchMap((result: any) => {
          return this.locationService.addLocation(result);
        })
      )
      .subscribe(() => {
        this.refreshLocations();
      });
  }

  remove(location: any) {
    const dialogData = new ConfirmDialogModel(
      'Confirmation',
      `Supprimer l'emplacement ${location.name} ?`
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.locationService.removeLocationById(location.id).subscribe(() => {
          this.refreshLocations();
        });
      }
    });
  }
}
