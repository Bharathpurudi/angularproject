import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../EntityModels/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  private baseUrl = 'http://localhost:8081/smmp/api/cart';
  constructor(private http: HttpClient) { }

  createCart(cart:Cart):Observable<any>{
    return this.http.post(`${this.baseUrl}`,cart)
  }
  
  getcartId(custId:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/getcartid/${custId}`)
  }

  getCartOfCustomer(cartId:number):Observable<Object>{
    return this.http.get(`${this.baseUrl}/getcart/${cartId}`)
  }


}
