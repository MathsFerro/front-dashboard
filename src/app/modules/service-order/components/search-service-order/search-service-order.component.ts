import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EquipmentType } from 'src/app/shared/models/enums/EquipmentType';

@Component({
  selector: 'app-search-service-order',
  templateUrl: './search-service-order.component.html',
  styleUrls: ['./search-service-order.component.scss']
})
export class SearchServiceOrderComponent implements OnInit {

  public equipmentTypeList: any[] = [];

  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  constructor() { }

  ngOnInit(): void {
    this.loadEquipmentTypeList();
  }

  loadEquipmentTypeList() {
    Object.entries(EquipmentType).forEach(([key, value]) => {
      this.equipmentTypeList.push({ key, value });
    });
  }
}
