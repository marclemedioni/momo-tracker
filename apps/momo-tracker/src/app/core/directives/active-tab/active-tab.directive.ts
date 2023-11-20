import { Directive } from '@angular/core';
import { MatTabLink } from '@angular/material/tabs';
import { RouterLinkActive } from '@angular/router';

@Directive({
  selector: 'a[routerLinkActive][mtTabLink]',
})
export class MatTabRouterLinkActiveDirective {
  constructor(routerLinkActive: RouterLinkActive, matTabLink: MatTabLink) {
    routerLinkActive.isActiveChange.subscribe(value => matTabLink.active = value);
  }
}
