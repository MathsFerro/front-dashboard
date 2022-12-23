import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterPageable } from 'src/app/shared/models/FilterPageable';
import { FilterSearchOrder } from 'src/app/shared/models/FilterSearchOrder';
import { Pageable } from 'src/app/shared/models/Pageable';
import { ServiceOrder } from 'src/app/shared/models/ServiceOrder';
import { handleFilterPageable } from 'src/app/shared/utils/HttpParamsUtils';
import { environment } from 'src/environments/environment';
import { FilterServiceOrder } from '../models/FilterServiceOrder';

@Injectable({
  providedIn: 'root'
})
export class ServiceOrderService {
  private url: string = `${environment.baseUrl}/order`;

  constructor(private http: HttpClient) { }

  add(serviceOrder: ServiceOrder): Observable<ServiceOrder> {
    return this.http.post<ServiceOrder>(`${this.url}`, serviceOrder);
  }

  numberNextOS(): Observable<number> {
    return this.http.get<number>(`${this.url}/number-next`);
  }

  findAllByFilter(filter: FilterSearchOrder, pageable: FilterPageable): Observable<Pageable<ServiceOrder[]>> {
    // console.log(filter.serviceOrderStatus.values);
    // console.log(filter);
    // const serviceOrderStatusValue = filter.serviceOrderStatus.map(status => status.value);
    const params = new HttpParams()
      .set('name', String(filter.name))
      .set('numberOrder', Number(filter.numberOrder))
      .set('serialNumber', String(filter.serialNumber))
      .set('equipmentType', String(filter.equipmentType))
      // .set('orderStatus', String(serviceOrderStatusValue.join(", ")))
      .set('page', String(pageable.page))
      .set('size', String(pageable.size));
    console.log("params:", params);
    return this.http.get<Pageable<ServiceOrder[]>>(`${this.url}`, { params })
  }
}
