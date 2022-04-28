import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cep } from '../models/Cep';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private url: string = 'https://viacep.com.br/ws/';

  constructor(private httpClient: HttpClient) { }

  findCep(cep: number): Observable<Cep> {
    return this.httpClient.get<Cep>(`${this.url}/${cep}/json`);
  }
}
