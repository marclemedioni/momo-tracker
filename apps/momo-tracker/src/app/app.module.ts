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
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { ConfirmDialogComponent } from './core/components/confirm-dialog/confirm-dialog.component';

const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'parcels',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        {
          name: 'recipientName',
          keypath: 'recipientName',
          options: { unique: false },
        },
        { name: 'size', keypath: 'size', options: { unique: false } },
      ],
    },
    {
      store: 'locations',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        {
          name: 'numberOfParcels',
          keypath: 'numberOfParcels',
          options: { unique: false },
        },
      ],
    },
  ],
};

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
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ConfirmDialogComponent],
})
export class AppModule {}
