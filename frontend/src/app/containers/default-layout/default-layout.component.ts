import { Component } from '@angular/core';

import { navItems, navItemsManager } from './_nav';
import { SessionService } from 'src/app/shared/providers/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {

  public navItems = navItems;
  public navItemsManager = navItemsManager;
  userData;

  constructor(
    private sessionService: SessionService
  ) {
    this.userData = this.sessionService.userData;
  }
}
