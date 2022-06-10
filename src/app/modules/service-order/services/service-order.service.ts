import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceOrder } from 'src/app/shared/models/ServiceOrder';

@Injectable({
  providedIn: 'root'
})
export class ServiceOrderService {

  private url: string = "http://localhost:8080/v1/service-order";

  constructor(private http: HttpClient) { }

  add(serviceOrder: ServiceOrder): Observable<ServiceOrder> {
    return this.http.post<ServiceOrder>(`${this.url}`, serviceOrder);
  }

  numberNextOS(): Observable<number> {
    return this.http.get<number>(`${this.url}/number-next-os`);
  }


}
