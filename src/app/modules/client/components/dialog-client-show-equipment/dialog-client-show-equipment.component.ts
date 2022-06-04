import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/shared/models/Client';
import { Equipment } from 'src/app/shared/models/Equipment';

@Component({
  selector: 'app-dialog-client-show-equipment',
  templateUrl: './dialog-client-show-equipment.component.html',
  styleUrls: ['./dialog-client-show-equipment.component.scss']
})
export class DialogClientShowEquipmentComponent implements OnInit {

  public dataSource: Equipment[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Client) { }

  ngOnInit(): void {
    //this.dataSource = this.data.equipments;
  }

}
