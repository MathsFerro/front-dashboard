import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterPageable } from 'src/app/shared/models/FilterPageable';
import { Pageable } from 'src/app/shared/models/Pageable';
import { ServiceOrder } from 'src/app/shared/models/ServiceOrder';
import { handleFilterPageable } from 'src/app/shared/utils/HttpParamsUtils';
import { environment } from 'src/environments/environment';
import { FilterServiceOrder } from '../models/FilterServiceOrder';

@Injectable({
  providedIn: 'root'
})
export class ServiceOrderService {

  private url: string = `${environment.baseUrl}/service-order`;

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
      .set('name', String(filter.name))
      .set('numberServiceOrder', String(filter.numberServiceOrder))
      .set('serialNumber', String(filter.serialNumber))
      .set('equipmentType', String(filter.equipmentType))
      .set('serviceOrderStatus', String(serviceOrderStatusValue.join(", ")))
      .set('page', String(pageable.page))
      .set('size', String(pageable.size));

    console.log("params:", params);
    return this.http.get<Pageable<ServiceOrder[]>>(`${this.url}/find-all-by-filter`, { params })
  }


}
