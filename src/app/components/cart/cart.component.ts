import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { cartId, clearCart, removeProduct, removeUpdatedQtyProd } from 'src/app/cart-state-store/cart.actions';
import { updateProdQtyReducer } from 'src/app/cart-state-store/cart.reducer';
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

  constructor(private store: Store, private router:Router, private cartService:CartserviceService, private productService:ProductServiceService) {
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

    // this.store.select(selectUpdtQtyCartEntries).subscribe({
    //   next:(data:any)=>console.log(data)
    // })
    this.deliveryChargesValidation()
    this.orderDate= this.getTodayDate()
    this.orderAmount=this.getOrderAmount()
    this.calculateOrderDisc()
    this.checkoutAmount=this.orderAmount-(this.orderDiscount+this.deliveryCharges)
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
  deliveryCharges:number=0;
  isCartCheckOut:boolean=true;

  generateInvoiceNum():string{
    let invoiceNum=uuid.v4()
    return invoiceNum;
  }

  calculateOrderDisc(){
    this.orderDiscount=this.orderAmount*0.05
  }

  deliveryChargesValidation(){
    if(this.cartProducts.length===0){
      this.deliveryCharges=0
    }else{
      this.deliveryCharges=50
    }
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
      orderProducts.push(new OrderProducts(0,element.productId,1))
    });
    return orderProducts;
  }

  goToHome(){
    this.router.navigate(['/home'])
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
        this.orderProductsList.forEach(e1=>{
          if(e1.productId===id){
            this.orderAmount-=(e.productPrice*e1.quantity)
            this.calculateOrderDisc()
            this.checkoutAmount=this.orderAmount-(this.orderDiscount+this.deliveryCharges)
          }
        })
        this.store.dispatch(removeProduct(e))
      }
      
    })
    const found=this.orderProductsList.find(e=>e.productId===id)
    if(found){
    this.orderProductsList.splice(this.orderProductsList.indexOf(found),1)
    if(this.orderProductsList.length===0){
      this.orderAmount=0
      this.deliveryCharges=0
      this.calculateOrderDisc()
      this.checkoutAmount=this.orderAmount-(this.orderDiscount+this.deliveryCharges)
    }
  }
    this.validateProducts();
  }

  validateProducts(){
    if(this.lengthOfCartProducts>0){
      this.isCartHavingItems=true
    }else{
      this.isCartHavingItems=false
    }
  }

  clearCart(){
    this.store.dispatch(clearCart())
  }

  updateTheProductsQuantity(productId:number, e:any){
    this.orderProductsList.forEach(element => {
      if(element.productId===productId){
        let initialQty=element.quantity
        element.quantity=e.target.value;
        this.cartProducts.forEach(e1=>{
          if(e1.productId===productId){
            if(initialQty<e.target.value || e.target.value==10 ){
              this.orderAmount+=(e1.productPrice*(e.target.value-initialQty))
              this.calculateOrderDisc()
              this.checkoutAmount=this.orderAmount-(this.orderDiscount+this.deliveryCharges)
            }else{
              this.orderAmount-=(e1.productPrice)
              this.calculateOrderDisc()
              this.checkoutAmount=this.orderAmount-(this.orderDiscount+this.deliveryCharges)
            }
            
          }
        })
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
     product={...element};
     product.stockQuantity=(element.stockQuantity-this.reduceQuantitySupport(element.productId)),
     this.productService.createProduct(product).subscribe((data:any)=>console.log(data))
    });
  }

  checkOut(){
    this.reduceQuantity();
    this.isCartCheckOut=false
    const checkOutOrder:OrderEntity[]=[];
    checkOutOrder.push(new OrderEntity(this.checkoutAmount,this.invoiceNum,this.orderAmount,this.orderDate,this.orderDiscount,0,this.orderProductsList))
    const checkoutCart = new Cart(this.cartId,this.custId,checkOutOrder)
    this.cartService.createCart(checkoutCart).subscribe({
      next:(data:any) => {console.log(data),this.clearCart(),this.orderProductsList=[],this.orderAmount=0,
        this.calculateOrderDisc(),this.deliveryCharges=0,this.checkoutAmount=0},
    })
  }


}
