import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url: string = "";

  constructor(private httpClient: HttpClient) { }

  add(client: any): Observable<any> {
    return this.httpClient.post(this.url, client);
  }

}
