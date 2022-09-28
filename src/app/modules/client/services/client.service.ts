import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipmentType } from 'src/app/shared/models/enums/EquipmentType';
import { FilterPageable } from 'src/app/shared/models/FilterPageable';
import { Pageable } from 'src/app/shared/models/Pageable';
import { handleFilterPageable } from 'src/app/shared/utils/HttpParamsUtils';
import { environment } from 'src/environments/environment';
import { Client } from '../../../shared/models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url: string = `${environment.baseUrl}/v1/client`;

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

  findClientsByName(name: string): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${this.url}/find-by-name/${name}`);
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
