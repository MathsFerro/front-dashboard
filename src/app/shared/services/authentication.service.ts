import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from '../models/Token';
import { UserModel } from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url: string = "http://localhost:8080/auth0/token"

  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService  
  ) { 
  }

  async authenticate(userModel: UserModel) {
    if(this.isAuthenticated())
      return;
    
    const params = new HttpParams({
      fromObject: {
        username: userModel.username,
        password: userModel.password,
      }
    });
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
    const token = await firstValueFrom(this.httpClient.post<Token>(this.url, params, httpOptions)); 
    localStorage.setItem('token', token.accessToken);   
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if(!token)
      return false;

    return !this.jwtHelper.isTokenExpired(token);
  }
}
