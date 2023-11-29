import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LocationsComponent } from './locations/locations.component';
import { ParcelsComponent } from './parcels/parcels.component';
import { AddParcelComponent } from './add-parcel/add-parcel.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { EditLocationComponent } from './edit-location/edit-location.component';
import { LocationResolver } from '../core/resolvers/location.resolver';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo:'locations', pathMatch:'full' },
      {
        path: 'locations', children: [
          { path: '', component: LocationsComponent, },
          { path: 'add', component: AddLocationComponent },
          { path: 'edit/:id', component: EditLocationComponent, resolve: { location: LocationResolver }, }
      ] },
      {
        path: 'parcels', children: [
        { path: '', component: ParcelsComponent },
        { path: 'add', component: AddParcelComponent },
      ] },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
