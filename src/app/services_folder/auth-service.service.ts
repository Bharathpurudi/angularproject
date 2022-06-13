import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl='http://localhost:8081/smmp/api/customer';
  constructor(private httpClient:HttpClient) { }

  generateToken(request:any){
    return this.httpClient.post<any>(`${this.baseUrl}/authenticate`,request,{responseType:'text' as 'json'})}

    welcome(token:string){
      let tokenStr='Bearer'+tokenize;
      const headers = new HttpHeaders().set('Authorization',tokenStr);
      return this.httpClient.get<string>("http://localhost:8081/",{headers,responseType:'text'as'json'})
    }

  
}
