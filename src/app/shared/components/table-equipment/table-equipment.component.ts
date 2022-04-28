import { Component, Input, OnInit } from '@angular/core';
import { Equipment } from '../../models/Equipment';

@Component({
  selector: 'app-table-equipment',
  templateUrl: './table-equipment.component.html',
  styleUrls: ['./table-equipment.component.scss']
})
export class TableEquipmentComponent implements OnInit {

  @Input() public dataSource: Equipment[];
  public displayedColumns: string[] = ['id', 'equipmentType'];

  constructor() { }

  ngOnInit(): void {  

  }

}
