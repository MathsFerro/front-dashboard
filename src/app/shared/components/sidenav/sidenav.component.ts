import { BooleanInput } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ItemMenu } from './models/ItemMenu';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public menuItems: ItemMenu[] = [];
  public selectedMenu: number;

  constructor() {
    this.buildMenuItems();
  }

  ngOnInit(): void {
  }

  buildMenuItems() {
    this.menuItems = [
      { iconName: "dashboard", routerLink: "/dashboard", value: 1 },
      { iconName: "insert_drive_file", routerLink: "/service-order", value: 2 },
      { iconName: "desktop_windows", routerLink: "/", value: 3 },
      { iconName: "people", routerLink:"/client", value: 4 }
    ];
  }

  handleSelectedMenu(menu: ItemMenu) {
    this.selectedMenu = menu.value;
  }
 
}
