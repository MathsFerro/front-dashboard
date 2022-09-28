import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from 'src/app/modules/equipment/models/Equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private url: string = "http://localhost:8080/v1/equipment";
  
  constructor(private http: HttpClient) { }

  findEquipmentsByClientId(clientId: string): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.url}/by-client/${clientId}`);
  }
}
