import { Component } from '@angular/core';

@Component({
  selector: 'mt-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  hasAccess = false;

  constructor() {}

  onCodeCompleted(code: string) {
    if(code === '1234') {
      this.hasAccess = true;
    }
  }
}
