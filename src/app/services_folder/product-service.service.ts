import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private baseUrl = 'http://localhost:8081/smmp/api/product';
  constructor(private http: HttpClient) { }


  getProducts(category:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/getAllProducts/${category}`)
  }

  getProductsLike(category:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/getAllProductsLike/${category}`)
  }

  /* updateQuantity({}):Observable<any>{
    return this.http.put(`${this.baseUrl}/updatequantity`,value)
  } */
}
