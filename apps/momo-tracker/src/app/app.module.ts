import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { RequesterModule } from './requester/requester.module';
import { MaterialModule } from '../material.module';
import { ConfirmDialogComponent } from './core/components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [AppComponent, NavBarComponent, ConfirmDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    LayoutModule,
    AdminModule,
    MaterialModule,
    RequesterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ConfirmDialogComponent],
})
export class AppModule {}
