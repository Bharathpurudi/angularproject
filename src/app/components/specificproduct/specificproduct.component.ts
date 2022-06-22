import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addProduct, addUpdatedQunatityProduct } from 'src/app/cart-state-store/cart.actions';
import { selectSpecificProduct } from 'src/app/cart-state-store/cart.selector';
import { OrderProducts } from 'src/app/EntityModels/OrderProducts';
import { Product } from 'src/app/EntityModels/Product';

@Component({
  selector: 'app-specificproduct',
  templateUrl: './specificproduct.component.html',
  styleUrls: ['./specificproduct.component.css']
})
export class SpecificproductComponent implements OnInit {

  orderProduct!: OrderProducts;
  product :Product = new Product();
  validatingProduct:Product=new Product();
  productExpireDate!: Date;
  referenceDate!:Date;
  currentDate!: Date;
  productAdded:boolean=false;
  productExpired:boolean=false;
  outOfStock:boolean=true;

  constructor( private store: Store,public datepipe: DatePipe, private router:Router) {
    this.store.select(selectSpecificProduct).subscribe({
      next:(data:any)=>{this.product=data,
        this.productExpireDate=this.getProductExpireDate()
        this.referenceDate=this.getRefDate();
        this.currentDate=new Date();
        this.productOutOfStock();
      }
    })
    this.orderProduct=new OrderProducts(0,this.product.productId,1)
    
  }

  getProductExpireDate(){
    const productExpDate= new Date(this.product.productDoe)
    return productExpDate;
  }

  getRefDate(){
    const now = new Date();
    now.setDate(now.getDate()-30);
    return now;
  }

  ngOnInit(): void {
  }

  productOutOfStock(){
    if(this.product.stockQuantity<=0){
      this.outOfStock=false;
    }
  }


  goToCart(){
    this.router.navigate(['/cart']);
  }

  addToCart(){
    if(this.productExpireDate>this.referenceDate && this.productExpireDate<this.currentDate){
      this.productExpired=true;
      alert("Product is near to expire date")
    }else{
    this.productAdded=true;
    this.store.dispatch(addProduct(this.product))
    this.store.dispatch(addUpdatedQunatityProduct(this.orderProduct))
    }
  }

}
