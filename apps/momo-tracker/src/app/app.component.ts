import { Component, isDevMode, OnInit } from '@angular/core';
import { AppUpdateService  } from './core/services/app-update.service';

@Component({
  selector: 'mt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'momo-tracker';

  constructor(
    private updateService: AppUpdateService
  ) {

  }

  ngOnInit() {
    if (!isDevMode()) {
      this.updateService.subscribeUpdates();
    }
  }

}
