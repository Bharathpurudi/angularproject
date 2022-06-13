import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { cartId, removeProduct } from 'src/app/cart-state-store/cart.actions';
import { productsCount, selectCartId, selectGroupedCartEntries, selectUpdtQtyCartEntries } from 'src/app/cart-state-store/cart.selector';
import { selectCustomer } from 'src/app/customer-state-store/customer.selector';
import { Cart } from 'src/app/EntityModels/Cart';
import { Customer } from 'src/app/EntityModels/Customer';
import { OrderEntity} from 'src/app/EntityModels/OrderEntity';
import { OrderProducts } from 'src/app/EntityModels/OrderProducts';
import { Product } from 'src/app/EntityModels/Product';
import { CartserviceService } from 'src/app/services_folder/cartservice.service';
import { ProductServiceService } from 'src/app/services_folder/product-service.service';
import * as uuid from 'uuid'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private store: Store, private cartService:CartserviceService, private productService:ProductServiceService) {
    this.store.select(selectGroupedCartEntries).subscribe({
      next:(data)=>this.cartProducts=data
    })
    this.store.select(selectCustomer).subscribe({
      next:(data)=> this.custId=data[0].custId
    }) 
    this.cartService.getcartId(this.custId).subscribe({
      next:(data)=>this.cartId=data
    })
    this.store.select(productsCount).subscribe({
      next:(data:any)=>this.lengthOfCartProducts=data
    })

    this.store.select(selectUpdtQtyCartEntries).subscribe({
      next:(data:any)=>console.log(data)
    })

    this.orderDate= this.getTodayDate()
    this.orderAmount=this.getOrderAmount()
    this.checkoutAmount=this.orderAmount-this.orderDiscount
    this.orderProductsList=this.getOrderProducts();
    this.invoiceNum=this.generateInvoiceNum()
    this.validateProducts()
    
   }

   ngOnInit(): void {
    }

  cartProducts:Product[]=[];
  custId:number=0;
  cartId:number=0;
  orderProductsList:OrderProducts[]=[];
  checkoutAmount:number= 0;
  invoiceNum:string="";
  orderAmount:number= 0;
  orderDate:string|null="";
  orderDiscount:number= 50;
  isCartHavingItems:boolean=true;
  lengthOfCartProducts:number=0;

  generateInvoiceNum():string{
    let invoiceNum=uuid.v4()
    return invoiceNum;
  }

  getOrderAmount(){
    let amount=0;
    this.cartProducts.forEach(element => {
      amount+=element.productPrice
    });
    return amount;
  }

  getOrderProducts(){
    const orderProducts:OrderProducts[]=[];
    this.cartProducts.forEach(element => {
      orderProducts.push(new OrderProducts(0,element.productId,0)) 
    });
    return orderProducts;
  }


  getTodayDate(){
    var datePipe = new DatePipe('en-US');
    let todayDate=new Date().toLocaleDateString()
    let modifiedDate=datePipe.transform(todayDate, 'yyyy-MM-dd');
    return modifiedDate;
  }

  onRemoveProduct(id:number){
    this.cartProducts.forEach(e=>{
      if(e.productId===id){
        this.store.dispatch(removeProduct(e))
      }
    })
    this.validateProducts();
  }

  validateProducts(){
    if(this.lengthOfCartProducts>0){
      this.isCartHavingItems=false
    }
  }

  updateTheProductsQuantity(productId:number, e:any){
    this.orderProductsList.forEach(element => {
      if(element.productId===productId){
        element.quantity=e.target.value;
      }
    });
  }

  reduceQuantitySupport(id:number):number{
  let retQuantity:number=0;
  this.orderProductsList.forEach(element => {
      if(element.productId===id){
        retQuantity=element.quantity
      }
    });
    return retQuantity;
  }

  reduceQuantity(){
  let copyProducts:Product[]=[...this.cartProducts]
   copyProducts.forEach(element => {
     let product=new Product;
     product=element,
     product.stockQuantity=(product.stockQuantity-this.reduceQuantitySupport(product.productId)),
     this.productService.createProduct(product).subscribe((data:any)=>console.log(data))
    });
  }

  checkOut(){
    //this.reduceQuantity();
    const checkOutOrder:OrderEntity[]=[];
    checkOutOrder.push(new OrderEntity(this.checkoutAmount,this.invoiceNum,this.orderAmount,this.orderDate,this.orderDiscount,0,this.orderProductsList))
    const checkoutCart = new Cart(this.cartId,this.custId,checkOutOrder)
    this.cartService.createCart(checkoutCart).subscribe(
      {
        next:(data:any)=>console.log(data)
      }
    )
  }


}
