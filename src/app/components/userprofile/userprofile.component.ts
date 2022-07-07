import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCustomer } from 'src/app/customer-state-store/customer.selector';
import { Customer } from 'src/app/EntityModels/Customer';
import { UserServiceService } from 'src/app/services_folder/userService.service';
import * as bcrypt from 'bcryptjs';
import { CartserviceService } from 'src/app/services_folder/cartservice.service';
import { Product } from 'src/app/EntityModels/Product';
import { ProductServiceService } from 'src/app/services_folder/product-service.service';
import { specifcProduct } from 'src/app/cart-state-store/cart.actions';
import { Router } from '@angular/router';
import { Address } from 'src/app/EntityModels/Address';
import { OrderEntity } from 'src/app/EntityModels/OrderEntity';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  customer:Customer=new Customer;
  custAddress!: Address;
  editForm = new UntypedFormGroup({
    firstName: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    lastName: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    mailId: new UntypedFormControl('', [Validators.required, Validators.email]),
    oldPassword: new UntypedFormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]),
    newPassword: new UntypedFormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]),
    mobileNum: new UntypedFormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],),
  },
  );

  addressForm= new UntypedFormGroup({
    doorNo: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 /-]+$')]),
    streetName: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    city: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    state: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    pincode: new UntypedFormControl('', [Validators.required, Validators.pattern("[0-9]{6}")],)
  })


  submitted:boolean=false;
  addressSubmitted:boolean=false;
  isAddAddressChecked:boolean=false;
  password:string="";
  newPassword:string="";
  isPasswordMatched:boolean=false;
  hashedPassword:string='';
  salt = bcrypt.genSaltSync(10);
  cartId:number=0;
  cart:any;
  isEditChecked:boolean=true;
  toggleTabs:boolean=false;
  clickedOnAddress:boolean=true;
  clickedOnPerProfile:boolean=true;
  clickedOnOrders:boolean=false;
  productsList:Product[]=[];
  addressesList:Address[]=[];
  newCust:boolean=false;

  editedCustomer:any={
    custId:0,
    firstName:'',
    lastName:"",
    userName:"",
    password:'',
    gender:'',
    mailId:"",
    mobileNum:'',
    dateOfBirth:''
  }

  

  constructor(private store:Store,private router: Router, private userService:UserServiceService,private productService:ProductServiceService ,private cartService:CartserviceService) {
    this.store.select(selectCustomer).subscribe({
      next:(data:any)=>{this.customer=data[0],this.getCartId()}
    })
    this.productService.getAllProducts().subscribe({
      next:(data:any)=>{this.productsList=data}
    })
    this.updateAddressDetails()
   }

  ngOnInit(): void {
  }

  get form() {
    return this.editForm.controls;
  }

  get addForm(){
    return this.addressForm.controls;
  }


 getCartId(){
   this.cartService.getcartId(this.customer.custId).subscribe({
     next:(data:any)=>{this.cartId=data,this.getCustCart()}
   })
 }

 getCustCart(){
  this.cartService.getCartOfCustomer(this.cartId).subscribe({
    next:(data:any)=>{this.cart=data, console.log(data)}
  })
 }

 validateCustCart(data:any){
  if(data==undefined){
    this.newCust=true;
  }
 }
 onCheckOfEdit(e:any){
   if(e.target.checked===true){
    this.isEditChecked=false
   }else{
    this.isEditChecked=true
   }
 }
 onCheckOfAddAddress(e:any){
  if(e.target.checked===true){
    this.isAddAddressChecked=false
   }else{
    this.isAddAddressChecked=true
   }
 }
 
  onEnterPassword(e: any) {
    this.password = e.target.value
  }

  onEnterConfirmPassword(e: any) {
    this.newPassword = e.target.value
  }

  paswordMatch(e:any) {
    if (this.password === this.newPassword) {
      this.isPasswordMatched = true
    } else {
      this.isPasswordMatched = false
    }
  }

  validateCheckBox(){
    const checkbox = document.getElementById('addressCheckBox',) as HTMLInputElement | null;
    if(checkbox!=null){
      checkbox.checked=false
    }
  }

  updateAddressDetails(){
    this.userService.getCustAddresses(this.customer.custId).subscribe({
      next:(data:any)=>{this.addressesList=data,console.log(data)}
    })
  }

  addAddress(){
    this.addressSubmitted=true;
    console.log("djgfhgfhgfh1")
    if(this.addressForm.valid){
      console.log("djgfhgfhgfh")
      this.custAddress=new Address(0,this.addressForm.value.city,this.customer.custId,this.addressForm.value.doorNo,this.addressForm.value.pincode,this.addressForm.value.state,this.addressForm.value.streetName);
      this.validateCheckBox()
      this.isAddAddressChecked=true
      this.userService.addCustAddress(this.custAddress).subscribe({
        next:(data:any)=>this.updateAddressDetails()
      })
    }
  }

  

  deleteUserAddress(id:number){
    this.userService.deleteCustAddress(id).subscribe({
      next:(data:any)=>{this.updateAddressDetails(),window.location.reload()}
    })
  }

  save() {
    this.userService.updateCustomerFeilds(this.editedCustomer.firstName,this.editedCustomer.lastName,this.editedCustomer.password,this.editedCustomer.mobileNum,this.editedCustomer.mailId,this.editedCustomer.custId,this.editedCustomer).subscribe({
      next:(data:any)=>console.log(data)
    })
  }

  async encryptPassword(){
    this.hashedPassword= bcrypt.hashSync(this.editForm.value.newPassword,this.salt);
  }

  onClickOnUserProfileEdit(){
    this.clickedOnAddress=true
    this.clickedOnOrders=true
    this.clickedOnPerProfile=false
    this.isAddAddressChecked=false
  }
  onClickOnOrders(){
    this.clickedOnOrders=false
    this.clickedOnPerProfile=true
    this.clickedOnAddress=true
    this.isAddAddressChecked=true
  }
  onClickOnAdresses(){
    this.clickedOnOrders=true
    this.clickedOnPerProfile=true
    this.clickedOnAddress=false;
  }

  goToSpecificProductPage(id:number){
    const tempProdList=this.productsList.filter((product =>product.productId===id))
    this.store.dispatch(specifcProduct(tempProdList[0]))
    this.router.navigate(['/specificproduct'])
  }

  downloadInvoice(order:OrderEntity) {  
    
  }  



  onSubmit() {
    this.submitted = true
    if (this.editForm.valid) {
      if(this.isPasswordMatched){
        alert('Passwords are same')
      }else{
        this.hashedPassword= bcrypt.hashSync(this.editForm.value.newPassword,this.salt)
        this.editedCustomer.custId=this.customer.custId
        this.editedCustomer.firstName=this.editForm.value.firstName
        this.editedCustomer.lastName=this.editForm.value.lastName
        this.editedCustomer.userName=this.customer.userName
        this.editedCustomer.gender=this.customer.gender
        this.editedCustomer.password=this.hashedPassword;
        this.editedCustomer.dateOfBirth=this.customer.dateOfBirth
        this.editedCustomer.mailId=this.editForm.value.mailId
        this.editedCustomer.mobileNum=this.editForm.value.mobileNum
        this.save();
        alert("User Details Updated Sucessfully")
      }
      
    } else {
      alert('User form is not valid!!')
    }
  }

}
