import { Component, OnInit } from '@angular/core';
import { Client } from '../../shared/models/Client';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  public dataSource: Client[];

  constructor(private clientService: ClientService) { 

  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    
  }

  findAllMock() {
    /*this.clientService.findAll().subscribe(data => {
      this.dataSource = data.content;
    })*/

    
    this.dataSource = this.clientService.findAllMock();
  }

  handleSuccess() {

  }
}
