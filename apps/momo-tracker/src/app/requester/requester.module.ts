import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequesterRoutingModule } from './requester-routing.module';
import { RequesterComponent } from './requester.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [RequesterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RequesterRoutingModule,
    MaterialModule,
  ],
})
export class RequesterModule {}
