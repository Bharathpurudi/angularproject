import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { cartId } from 'src/app/cart-state-store/cart.actions';
import { selectCartId, selectGroupedCartEntries } from 'src/app/cart-state-store/cart.selector';
import { selectCustomer } from 'src/app/customer-state-store/customer.selector';
import { Cart } from 'src/app/EntityModels/Cart';
import { Customer } from 'src/app/EntityModels/Customer';
import { orderEntity } from 'src/app/EntityModels/orderEntity';
import { orderProducts } from 'src/app/EntityModels/orderProducts';
import { Product } from 'src/app/EntityModels/Product';
import { CartserviceService } from 'src/app/services_folder/cartservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private store: Store, private cartService:CartserviceService) {
    this.store.select(selectGroupedCartEntries).subscribe({
      next:(data)=>this.cartProducts=data
    })
    this.store.select(selectCustomer).subscribe({
      next:(data)=> this.custId=data[0].custId
    })
    this.cartService.getcartId(this.custId).subscribe({
      next:(data)=>this.cartId=data
    })

    this.orderDate= this.getTodayDate()
    this.orderAmount=this.getOrderAmount()
    this.checkoutAmount=this.orderAmount-this.orderDiscount
    
   }
  cartProducts:Product[]=[];
  custId:number=0;
  cartId:number=0;
  cart:Cart=new Cart;
  orderEntity:orderEntity=new orderEntity;
  orderProducts:orderProducts=new orderProducts;
  checkoutAmount:number= 0;
  invoiceNum:number= 0;
  orderAmount:number= 0;
  orderDate:string|null="";
  orderDiscount:number= 500;

  getOrderAmount(){
    let amount=0;
this.cartProducts.forEach(element => {
      amount+=element.productPrice
    });
    return amount;
  }

  ngOnInit(): void {

  }

  getTodayDate(){
    var datePipe = new DatePipe('en-US');
    let todayDate=new Date().toLocaleDateString()
    let modifiedDate=datePipe.transform(todayDate, 'yyyy-MM-dd');
    return modifiedDate;
  }

  

}
