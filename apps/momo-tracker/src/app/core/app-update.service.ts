import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {
  constructor(private readonly updates: SwUpdate) {
    this.updates.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(evt => {
        if (this.promptUser()) {
          // Reload the page to update to the latest version.
          document.location.reload();
        }
      });
  }

  promptUser(): boolean {
    return confirm('Nouvelle version disponible')
  }

  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
