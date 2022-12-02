import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequesterComponent } from './requester.component';

const routes: Routes = [
  {
    path: '',
    component: RequesterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequesterRoutingModule { }
