import { Injectable } from '@angular/core';
import { Customer } from '../EntityModels/Customer';

@Injectable({
  providedIn: 'root'
})
export class StoreserviceService {

  public _myVariable: string;

  private productsFoundVar: boolean = false;

  public customerDetails = new Customer();

  private productDetails:object={};

  private productsList: object[] = [];

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

setProduct(product:object){
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

constructor(){
  this._myVariable = "exampletest";
}

}
