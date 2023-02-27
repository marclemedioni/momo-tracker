import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeInputModule } from 'angular-code-input';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../../material.module';
import { AddLocationComponent } from './add-location/add-location.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminComponent, AddLocationComponent],
  imports: [
    AdminRoutingModule,
    CodeInputModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
