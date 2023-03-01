import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeInputModule } from 'angular-code-input';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    AdminRoutingModule,
    CodeInputModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AdminModule {}
