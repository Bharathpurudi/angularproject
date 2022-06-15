import { Injectable } from '@angular/core';
import { Customer } from '../EntityModels/Customer';
import { Product } from '../EntityModels/Product';

@Injectable({
  providedIn: 'root'
})
export class StoreserviceService {
  constructor(){
    this._myVariable = "exampletest";
  }

  public _myVariable: string;

  private productsFoundVar: boolean = false;

  public customerDetails = new Customer();

  private productDetails= new Product();

  private productsList: object[] = [];

  private cartAddedItems:Product[]=[];

  setCustomer(customer:Customer){
    this.customerDetails=customer
  }

  getCustomer(){
    return this.customerDetails;
  }

getMyVariable(){
   return this._myVariable;
}

setMyVariable(newValue: any){
   this._myVariable = newValue;
}

setProduct(product:Product){
  this.productDetails=product;
}

getProduct(){
  return this.productDetails;
}

setProductsFoundVar(value:boolean){
  this.productsFoundVar=value;
}

getProductsFoundVar(){
  return this.productsFoundVar;
}

setProductsList(list:object[]){
  this.productsList=list;
}

getProductsList(){
  return this.productsList;
}

setCartProducts(value:Product){
  this.cartAddedItems.push(value);
}

getCartAddedItems(){
  return this.cartAddedItems;
}



}
