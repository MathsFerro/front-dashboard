import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipmentType } from 'src/app/shared/models/enums/EquipmentType';
import { FilterPageable } from 'src/app/shared/models/FilterPageable';
import { Pageable } from 'src/app/shared/models/Pageable';
import { handleFilterPageable } from 'src/app/shared/utils/HttpParamsUtils';
import { Client } from '../../../shared/models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url: string = "http://localhost:8080/api/v1/client";

  private mock: Pageable<Client[]> = {
    page: 0,
    totalElements: 10,
    totalPages: 2,
    size: 5,
    content: [
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
    ]
  };

  constructor(private httpClient: HttpClient) { }

  add(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.url, client);
  }

  findAll(filter: FilterPageable): Observable<Pageable<Client[]>> {
    const params = handleFilterPageable(filter);
    return this.httpClient.get<Pageable<Client[]>>(this.url, { params });
  }

  /*addMock(client: Client) {
    this.mock.push(client);
  }*/

  findAllMock(): Pageable<Client[]> {
    return this.mock;
  }

  findByName(name: number): Observable<Client[]> {
    const params = new HttpParams();
    params.append("name", name);

    return this.httpClient.get<Client[]>(this.url, { params });
  }

  findById(id: number): Observable<Client> {
    return this.httpClient.get<Client>(`${this.url}/${id}`);
  }
}
