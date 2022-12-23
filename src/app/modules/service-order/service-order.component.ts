import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EquipmentType } from 'src/app/shared/models/enums/EquipmentType';
import { FilterPageable } from 'src/app/shared/models/FilterPageable';
import { FilterSearchOrder } from 'src/app/shared/models/FilterSearchOrder';
import { Pageable } from 'src/app/shared/models/Pageable';
import { ServiceOrder } from 'src/app/shared/models/ServiceOrder';
import { FilterServiceOrder } from './models/FilterServiceOrder';
import { ServiceOrderService } from './services/service-order.service';

@Component({
  selector: 'app-service-order',
  templateUrl: './service-order.component.html',
  styleUrls: ['./service-order.component.scss']
})
export class ServiceOrderComponent implements OnInit {
  public data = new Pageable<ServiceOrder[]>();
  private initialPageableFilter: FilterPageable;

  constructor(
    private service: ServiceOrderService
  ) {
    this.initialPageableFilter = {
      page: 0,
      size: 10,
      totalElements: 0,
      totalPages: 0
    };
  }

  ngOnInit(): void {
  }

  public searchByFilter(filterServiceOrder: FilterSearchOrder) {
    this.service.findAllByFilter(filterServiceOrder, this.initialPageableFilter).subscribe(resp => {
      console.log("Resp: ", resp);
    })
  }
}
