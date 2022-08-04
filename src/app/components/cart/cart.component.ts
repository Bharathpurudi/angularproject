import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { cartId, clearCart, removeProduct, removeUpdatedQtyProd } from 'src/app/cart-state-store/cart.actions';
import { updateProdQtyReducer } from 'src/app/cart-state-store/cart.reducer';
import { productsCount, selectCartId, selectGroupedCartEntries, selectUpdtQtyCartEntries } from 'src/app/cart-state-store/cart.selector';
import { selectCustomer } from 'src/app/customer-state-store/customer.selector';
import { Address } from 'src/app/EntityModels/Address';
import { Cart } from 'src/app/EntityModels/Cart';
import { Customer } from 'src/app/EntityModels/Customer';
import { OrderEntity} from 'src/app/EntityModels/OrderEntity';
import { OrderProducts } from 'src/app/EntityModels/OrderProducts';
import { Product } from 'src/app/EntityModels/Product';
import { CartserviceService } from 'src/app/services_folder/cartservice.service';
import { ProductServiceService } from 'src/app/services_folder/product-service.service';
import { UserServiceService } from 'src/app/services_folder/userService.service';
import * as uuid from 'uuid'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cardForm=new UntypedFormGroup({
    cardNo: new UntypedFormControl('', [Validators.required, Validators.pattern("[0-9-]{19}")],),
    cvv: new UntypedFormControl('', [Validators.required, Validators.pattern("[0-9]{3}")],),
    expiryDate: new UntypedFormControl('', [Validators.required, Validators.pattern("[0-9/]{5}")],),
    holderName: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')])
  })

  upiForm=new UntypedFormGroup({
    upiAddress:new UntypedFormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9@ ]+$')])
  })

  constructor(private store: Store, private router:Router, private cartService:CartserviceService, private productService:ProductServiceService, private userService:UserServiceService) {
    this.store.select(selectGroupedCartEntries).subscribe({
      next:(data)=>this.cartProducts=data
    })
    this.store.select(selectCustomer).subscribe({
      next:(data)=> {this.custId=data[0].custId,
        this.updateAddressDetails()}
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
  addressesList:Address[]=[];
  checkoutAmount:number= 0;
  invoiceNum:string="";
  orderAmount:number= 0;
  orderDate:string|null="";
  orderDiscount:number= 50;
  isCartHavingItems:boolean=true;
  lengthOfCartProducts:number=0;
  deliveryCharges:number=0;
  addressIdOfCust:number=0;
  isCartCheckOut:boolean=true;
  isCardClicked:boolean=true;
  isCardSubmitted:boolean=false;
  isPayemtClicked:boolean=false;
  upiPaymentsClicked:boolean=true;
  isUpiSubmitted:boolean=false;
  isAddressSelected:boolean=false;
  isPaymentButtonDisabled:boolean=false;
  //newCust:boolean=true;
  upi:string="UPI"
  card:string="CARD"

  get cardCon(){
    return this.cardForm.controls;
  }

  get upiCon(){
    return this.upiForm.controls;
  }

  updateAddressDetails(){
    this.userService.getCustAddresses(this.custId).subscribe({
      next:(data:any)=>{this.addressesList=data}
    })
  }

  // validateAddress(){
  //   if(this.addressesList.length===0){
  //     this.newCust=false
  //     this.isAddressSelected=true
  //   }else{
  //     this.newCust=true
  //   }
  // }

  clickedOnCard(){
    this.isCardClicked=false
    this.upiPaymentsClicked=true;
  }
  clickedOnUpiPayments(){
    this.isCardClicked=true
    this.upiPaymentsClicked=false;
  }
  
  setAddressId(id:number){
    if(this.cartProducts.length!=0){
      this.addressIdOfCust=id
    this.isAddressSelected=true
    this.isPayemtClicked=true;
    }else{
      alert("Add Items to cart to proceed")
    }
  }


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
  goToUserProfile(){
    this.router.navigate(['/user-profile'])
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
    if(this.cartProducts.length==0){
      this.isPayemtClicked=false;
    }
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

  checkOut(value:string){
    if(value===this.card){
      this.isCardSubmitted=true;
      if(this.cardForm.valid){
        this.reduceQuantity();
        this.isCartCheckOut=false
        const checkOutOrder:OrderEntity[]=[];
        checkOutOrder.push(new OrderEntity(this.checkoutAmount,this.invoiceNum,this.orderAmount,this.orderDate,this.orderDiscount,0,this.orderProductsList,this.addressIdOfCust))
        const checkoutCart = new Cart(this.cartId,this.custId,checkOutOrder)
        this.cartService.createCart(checkoutCart).subscribe({
        next:(data:any) => {this.clearCart(),this.orderProductsList=[],this.orderAmount=0,
            this.calculateOrderDisc(),this.deliveryCharges=0,this.checkoutAmount=0},
        })
        this.cardForm.disable()
        this.isPaymentButtonDisabled=true;
        }else{
          alert("Enter Correct card details")
        }
        
    }
    if(value===this.upi){
        this.isUpiSubmitted=true;
        console.log(this.upiForm.valid)
        if(this.upiForm.valid){
        this.reduceQuantity();
        this.isCartCheckOut=false
        const checkOutOrder:OrderEntity[]=[];
        checkOutOrder.push(new OrderEntity(this.checkoutAmount,this.invoiceNum,this.orderAmount,this.orderDate,this.orderDiscount,0,this.orderProductsList,this.addressIdOfCust))
        const checkoutCart = new Cart(this.cartId,this.custId,checkOutOrder)
        this.cartService.createCart(checkoutCart).subscribe({
        next:(data:any) => {this.clearCart(),this.orderProductsList=[],this.orderAmount=0,
            this.calculateOrderDisc(),this.deliveryCharges=0,this.checkoutAmount=0},
        })
        this.upiForm.disable();
        this.isPaymentButtonDisabled=true;
        }else{
          alert("UPI address is not valid")
        }

    }
  }
}
