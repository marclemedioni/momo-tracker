import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeInputModule } from 'angular-code-input';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { MatTabRouterLinkActiveDirective } from '../core/directives/active-tab/active-tab.directive';
import { AddLocationComponent } from './add-location/add-location.component';
import { AddParcelComponent } from './add-parcel/add-parcel.component';
import { LocationsComponent } from './locations/locations.component';
import { ParcelsComponent } from './parcels/parcels.component';
import { EditLocationComponent } from './edit-location/edit-location.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AddLocationComponent, EditLocationComponent, AddParcelComponent, LocationsComponent, ParcelsComponent, AdminComponent, MatTabRouterLinkActiveDirective],
  imports: [
        RouterModule,
    AdminRoutingModule,
    CodeInputModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AdminModule {}
