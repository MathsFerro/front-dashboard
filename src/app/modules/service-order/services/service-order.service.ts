import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceOrderService {

  private url: string = "http://localhost:8080/v1/service-order";

  constructor(private http: HttpClient) { }

  numberNextOS(): Observable<number> {
    return this.http.get<number>(`${this.url}/number-next-os`);
  }


}
