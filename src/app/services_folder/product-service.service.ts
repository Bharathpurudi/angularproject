import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../EntityModels/Product';

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

  createProduct(product:Product):Observable<any>{
    return this.http.post(`${this.baseUrl}/createProduct`,product)
  }
}
