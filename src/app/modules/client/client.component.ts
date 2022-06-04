import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterPageable } from 'src/app/shared/models/FilterPageable';
import { Pageable } from 'src/app/shared/models/Pageable';
import { Client } from '../../shared/models/Client';
import { DialogFormClientComponent } from './components/dialog-form/dialog-form-client.component';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  public dataSource: Pageable<Client[]> = new Pageable<Client[]>();
  private filterPageable: FilterPageable = new FilterPageable();

  constructor(
    private clientService: ClientService, 
    private matDialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.initialFilterPageable();
    this.findAll();
  }

  findAll() {
    this.clientService.findAll(this.filterPageable).subscribe(data => {
      this.dataSource = data;
      console.log(this.dataSource)
    }, error => console.log(error));
  }

  handleSuccess() {

  }

  searchByPage(currentPage: any) {
    this.filterPageable.page = currentPage;
    this.findAll();
  }

  openAddModal() {
    this.matDialog.open(DialogFormClientComponent, {
      data: null,
      disableClose: true
    });
  }

  private initialFilterPageable() {
    this.filterPageable.page = 0;
  }
}
