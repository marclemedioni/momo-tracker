import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequesterRoutingModule } from './requester-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [HomeComponent, SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RequesterRoutingModule,
  ],
})
export class RequesterModule {}
