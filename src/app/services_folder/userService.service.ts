import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = 'http://localhost:8081/smmp/api/customer';
  constructor(private http: HttpClient) { }

  createCustomer(customer: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, customer);
  }

  getCustomer(name:string):Observable<Object>{
    return this.http.get(`${this.baseUrl}/${name}`)
  }

  updateCustomer(customer:Object): Observable<Object>{
    return this.http.post(`${this.baseUrl}/updatecustomer`,customer);
  }


}