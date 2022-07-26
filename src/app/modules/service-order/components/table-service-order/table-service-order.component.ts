import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pageable } from 'src/app/shared/models/Pageable';
import { ServiceOrder } from 'src/app/shared/models/ServiceOrder';
import { ServiceOrderService } from '../../services/service-order.service';

@Component({
  selector: 'app-table-service-order',
  templateUrl: './table-service-order.component.html',
  styleUrls: ['./table-service-order.component.scss']
})
export class TableServiceOrderComponent implements OnInit {

  @Input() dataSource: ServiceOrder[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  displayedColumns: string[] = ['name', 'actions'];

}
