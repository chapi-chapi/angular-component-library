import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'ACL';
  public sideNavOpen = false;

  public toggleSideNav = () => this.sideNavOpen = !this.sideNavOpen;
}
