import { Component, OnInit } from '@angular/core';
import { EquipmentType } from 'src/app/shared/models/enums/EquipmentType';

@Component({
  selector: 'app-service-order',
  templateUrl: './service-order.component.html',
  styleUrls: ['./service-order.component.scss']
})
export class ServiceOrderComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    console.log(EquipmentType);


  }

}
