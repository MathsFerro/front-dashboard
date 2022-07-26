import { animate, state, style, transition, trigger } from '@angular/animations';
import { BooleanInput } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ItemMenu } from './models/ItemMenu';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  animations: [    
    trigger('onSideNavChange', [
      state('close',   
        style({
          'margin-left': '0px',
        }) 
      ),
      state('open',
        style({
          'margin-left': '58px',
          'transform': 'rotate(180deg)'
        }) 
      ),
      transition('open <=> closed', [
        animate('0.2s')
      ]),
    ])
  ],
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public isOpen = true;

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
