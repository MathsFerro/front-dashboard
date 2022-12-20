import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ItemMenu } from '../shared/components/item-menu/models/ItemMenu';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
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
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

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
      // { iconName: "dashboard", routerLink: "/dashboard", value: 1 },
      { iconName: "insert_drive_file", routerLink: "/service-order", value: 2 },
      { iconName: "desktop_windows", routerLink: "/equipment", value: 3 },
      // { iconName: "people", routerLink:"/client", value: 4 }
    ];
  }

  handleSelectedMenu(menu: ItemMenu) {
    this.selectedMenu = menu.value;
  }

  logoff() {
    localStorage.clear();
    location.reload(); // TODO arrumar
  }
}
