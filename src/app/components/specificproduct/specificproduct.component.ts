import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addProduct, addUpdatedQunatityProduct } from 'src/app/cart-state-store/cart.actions';
import { selectGroupedCartEntries, selectSpecificProduct } from 'src/app/cart-state-store/cart.selector';
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
  cartAddedProducts:Product[]=[];

  constructor( private store: Store,public datepipe: DatePipe, private router:Router) {
    
    this.store.select(selectSpecificProduct).subscribe({
      next:(data:any)=>{this.product=data,
        this.getTheCartAddedProducts(),
        this.productExpireDate=this.getProductExpireDate()
        this.referenceDate=this.getRefDate();
        this.currentDate=new Date();
        this.productOutOfStock();
      }
    })
    this.orderProduct=new OrderProducts(0,this.product.productId,1)
    
  }

  getTheCartAddedProducts(){
    this.store.select(selectGroupedCartEntries).subscribe({
      next:(data)=>this.cartAddedProducts=data
    })
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

  validateTheProduct(id:number){
    let productFound:boolean=false;
    if(this.cartAddedProducts.length===0){
      productFound=false
    }else{
      const found= this.cartAddedProducts.filter(e=>e.productId===id)
      if(found.length===0){
        productFound=false
      }else{
        productFound=true
      }
    }
    return productFound;
  }


  goToCart(){
    this.router.navigate(['/cart']);
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  addToCart(id:number){
    if(this.validateTheProduct(id)){
      alert("Product is already in the cart")
    }else{
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

}
