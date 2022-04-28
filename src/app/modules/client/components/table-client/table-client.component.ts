import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pageable } from 'src/app/shared/models/Pageable';
import { Client } from '../../../../shared/models/Client';
import { DialogClientShowEquipmentComponent } from '../dialog-client-show-equipment/dialog-client-show-equipment.component';


@Component({
  selector: 'app-table-client',
  templateUrl: './table-client.component.html',
  styleUrls: ['./table-client.component.scss']
})
export class TableClientComponent implements OnInit {

  @Input() public dataSource: Client[];
  public displayedColumns: string[] = ['id', 'name', 'email', 'phoneNumber', 'actions'];

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  handleShowEquipments(client: Client) {
    this.matDialog.open(DialogClientShowEquipmentComponent, {
      data: client
    });
  }

  searchByCurrentPage(event: any) {
    console.log(event);
  }
}
