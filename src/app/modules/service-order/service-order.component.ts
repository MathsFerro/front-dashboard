import { Component, OnInit } from '@angular/core';
import { EquipmentType } from 'src/app/shared/models/enums/EquipmentType';
import { FilterPageable } from 'src/app/shared/models/FilterPageable';
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
  private filter: FilterPageable = {
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0
  };

  constructor(
    private service: ServiceOrderService
  ) {}

  ngOnInit(): void {
  }
  
  searchByPage(currentPage: number) {
    this.filter.page = currentPage;
    this.findAll();
  }

  handleSearch(formServiceOrder: any) {
    console.log(formServiceOrder);
    // if(formServiceOrder!=null) {
    //   return this.findAllByFilter(formServiceOrder);
    // }

    return this.findAll();
  }

  findAllByFilter(formServiceOrder: FilterServiceOrder) {
    this.service.findAllByFilter(formServiceOrder, this.filter).subscribe((data) => console.log(data));
  
  }

  findAll() {
    this.service.findAllPageable(this.filter).subscribe(resp => {

      this.data = resp;
      console.log(this.data);
    });

  }
}
