import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, switchMap } from 'rxjs';
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

  constructor(private dataBase: NgxIndexedDBService, public dialog: MatDialog) {
    this.refreshLocations();
  }

  onCodeCompleted(code: string) {
    if(code === '1234') {
      this.hasAccess = true;
    }
  }

  refreshLocations() {
    this.locations$ = this.dataBase.getAll('locations')
  }

  addLocation() {
    this.addLocationDialogRef = this.dialog.open(AddLocationComponent);
    this.addLocationDialogRef.afterClosed().pipe(
      switchMap((result: any) => {
        return this.dataBase.add('locations', result)
      })
    )
    .subscribe(() => {
      this.refreshLocations();
    })
  }

  remove(id: number) {
    if (confirm('Voulez vous vraiment supprimer cet emplacement ?')) {
      this.dataBase.deleteByKey('locations', id).subscribe(() => {
        this.refreshLocations();
      });
    }
  }
}
