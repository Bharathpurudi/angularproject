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

  getProduct(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/getproduct/${id}`)
  }

  getProductsLike(category:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/getAllProductsLike/${category}`)
  }

  getAllProducts():Observable<any>{
    return this.http.get(`${this.baseUrl}/getAllProducts`)
  }

  createProduct(product:Product):Observable<any>{
    return this.http.post(`${this.baseUrl}/createProduct`,product)
  }
}
