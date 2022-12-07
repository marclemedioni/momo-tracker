import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {
  constructor(private readonly updates: SwUpdate) {

  }

  promptUser(): boolean {
    return confirm('Nouvelle version disponible')
  }

  subscribeUpdates() {
    this.updates.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(() => {
        if (this.promptUser()) {
          // Reload the page to update to the latest version.
          document.location.reload();
        }
      });
  }
}
