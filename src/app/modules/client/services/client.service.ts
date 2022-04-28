import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipmentType } from 'src/app/shared/models/enums/EquipmentType';
import { Pageable } from 'src/app/shared/models/Pageable';
import { Client } from '../../../shared/models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url: string = "http://localhost:8080/api/v1/client";

  private mock: Client[] = [
    {
      id: 1,
      name: "Matheus Ferro Raimundo",
      email: "matheusferroraimundo@gmail.com",
      phoneNumber: "11976005294",
      address: {
        cep: "",
        city: "",
        logradouro: "",
        uf: ""
      },
      equipments: [
        { id: 1, equipmentType: EquipmentType.COMPUTADOR },
        { id: 2, equipmentType: EquipmentType.NOTEBOOK }
      ]
    },
    {
      id: 2,
      name: "Roberto Mauro Rodero Raimundo",
      email: "roberto@gmail.com",
      phoneNumber: "119999999",
      address: {
        cep: "",
        city: "",
        logradouro: "",
        uf: ""
      },
      equipments: []
    },
    {
      id: 3,
      name: "Ferro Raimundo",
      email: "ferro@gmail.com",
      phoneNumber: "119999999",
      address: {
        cep: "",
        city: "",
        logradouro: "",
        uf: ""
      },
      equipments: [
        { id: 3, equipmentType: EquipmentType.IMPRESSORA }
      ]
    }
  ];

  constructor(private httpClient: HttpClient) { }

  add(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.url, client);
  }

  findAll(): Observable<Pageable<Client[]>> {
    return this.httpClient.get<Pageable<Client[]>>(this.url);
  }

  addMock(client: Client) {
    this.mock.push(client);
  }

  findAllMock(): Client[] {
    return this.mock;
  }
}
