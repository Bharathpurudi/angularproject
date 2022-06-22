import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { last, Observable } from 'rxjs';


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

  updateCustomerFeilds(firstName:string,lastName:string,password:string,mobileNum:string,mailId:string,custId:number,value:any):Observable<Object>{
    return this.http.put(`${this.baseUrl}/updateFeilds/${firstName}/${lastName}/${password}/${mobileNum}/${mailId}/${custId}`,value);
  }

  addCustAddress(address:any):Observable<Object>{
    return this.http.post(`${this.baseUrl}/addaddress`,address);
  }

  getCustAddresses(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/getaddressesofcust/${id}`)
  }

}