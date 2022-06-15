import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { observable, Observable, of } from 'rxjs';
import { selectCustomer } from '../customer-state-store/customer.selector';
import { Customer } from '../EntityModels/Customer';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl='http://localhost:8081/smmp/api/customer';
  customer:Customer=new Customer;
  constructor(private httpClient:HttpClient, private store:Store, private cookies:CookieService) {
    this.store.select(selectCustomer).subscribe((data:any)=>(this.customer=data[0]))
   }

  generateToken(request:any){
    return this.httpClient.post<any>
    (`${this.baseUrl}/authenticate`,request,{responseType:'text' as 'json'})}

    welcome(token:string){
      let tokenStr='Bearer';
      const headers = new HttpHeaders().set('Authorization',tokenStr);
      return this.httpClient.get<string>("http://localhost:8081/",{headers,responseType:'text'as'json'})
    }

    isLoggedIn():Observable<boolean>{
    let isLoggedIn;
    const jwtToken = this.cookies.get('jwt_token')
   if(jwtToken!=""){
    const parsedJwt = JSON.parse(atob(jwtToken.split('.')[1]))
    if(parsedJwt.userName===this.customer.userName){
      isLoggedIn=true;
      }else{
     isLoggedIn=false;
      }
   }else{
    isLoggedIn=false
    }
    return of(isLoggedIn);
  }
  
}
