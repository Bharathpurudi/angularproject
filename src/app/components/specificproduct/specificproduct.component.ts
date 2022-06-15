import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addProduct, addUpdatedQunatityProduct } from 'src/app/cart-state-store/cart.actions';
import { productsCount, selectGroupedCartEntries } from 'src/app/cart-state-store/cart.selector';
import { OrderProducts } from 'src/app/EntityModels/OrderProducts';
import { Product } from 'src/app/EntityModels/Product';
import { StoreserviceService } from 'src/app/services_folder/storeservice.service';

@Component({
  selector: 'app-specificproduct',
  templateUrl: './specificproduct.component.html',
  styleUrls: ['./specificproduct.component.css']
})
export class SpecificproductComponent implements OnInit {

  orderProduct!: OrderProducts;
  product :Product = new Product();
  validatingProduct:Product=new Product();
  productExpireDate:Date;
  referenceDate:Date;
  currentDate:Date;
  productAdded:boolean=false;
  productExpired:boolean=false;
  outOfStock:boolean=true;

  constructor(private storeService:StoreserviceService, private store: Store,public datepipe: DatePipe, private router:Router) {
    this.getTheProduct();
    this.orderProduct=new OrderProducts(0,this.product.productId,1)
    this.productExpireDate=this.getProductExpireDate()
    this.referenceDate=this.getRefDate();
    this.currentDate=new Date();
    this.productOutOfStock();
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
    this.getTheProduct()
  }

  productOutOfStock(){
    if(this.product.stockQuantity<=0){
      this.outOfStock=false;
    }
  }

  getTheProduct(){
    this.product=this.storeService.getProduct();
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
    this.storeService.setCartProducts(this.product)
    this.store.dispatch(addProduct(this.product))
    this.store.dispatch(addUpdatedQunatityProduct(this.orderProduct))
    this.store.select(selectGroupedCartEntries).subscribe((data:any)=>(console.log(data)))
    }
  }

}
