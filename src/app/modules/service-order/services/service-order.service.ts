import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterPageable } from 'src/app/shared/models/FilterPageable';
import { Pageable } from 'src/app/shared/models/Pageable';
import { ServiceOrder } from 'src/app/shared/models/ServiceOrder';
import { handleFilterPageable } from 'src/app/shared/utils/HttpParamsUtils';
import { FilterServiceOrder } from '../models/FilterServiceOrder';

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

  findAllPageable(filter: FilterPageable): Observable<Pageable<ServiceOrder[]>> {
    const params = handleFilterPageable(filter);
    return this.http.get<Pageable<ServiceOrder[]>>(`${this.url}`, { params });
  }

  findAllByFilter(filter: FilterServiceOrder, pageable: FilterPageable): Observable<Pageable<ServiceOrder[]>> {
    console.log(filter.serviceOrderStatus.values);
    console.log(filter);
    const serviceOrderStatusValue = filter.serviceOrderStatus.map(status => status.value);
    const params = new HttpParams()
      .set('client.name', String(filter.client?.name))
      .set('numberServiceOrder', String(filter.numberServiceOrder))
      .set('equipment.serialNumber', String(filter.equipment?.serialNumber))
      .set('equipment.equipmentType', String(filter.equipment?.equipmentType))
      .set('serviceOrderStatus', String(serviceOrderStatusValue.join(", ")))
      .set('page', String(pageable.page))
      .set('size', String(pageable.size));
    return this.http.get<Pageable<ServiceOrder[]>>(`${this.url}/find-all-by-filter`, { params })
  }


}
