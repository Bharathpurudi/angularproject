import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCustomer } from 'src/app/customer-state-store/customer.selector';
import { Customer } from 'src/app/EntityModels/Customer';
import { UserServiceService } from 'src/app/services_folder/userService.service';
import * as bcrypt from 'bcryptjs';
import { CartserviceService } from 'src/app/services_folder/cartservice.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/EntityModels/Product';
import { ProductServiceService } from 'src/app/services_folder/product-service.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  customer:Customer=new Customer;
  editForm = new UntypedFormGroup({
    firstName: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    lastName: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    mailId: new UntypedFormControl('', [Validators.required, Validators.email]),
    oldPassword: new UntypedFormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]),
    newPassword: new UntypedFormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]),
    mobileNum: new UntypedFormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],),
  },
  );
  submitted:boolean=false;
  password:string="";
  newPassword:string="";
  isPasswordMatched:boolean=false;
  hashedPassword:string='';
  salt = bcrypt.genSaltSync(10);
  cartId:number=0;
  cart:any;
  isEditChecked:boolean=true;
  toggleTabs:boolean=false;
  productsList:Product[]=[];

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

  constructor(private store:Store, private userService:UserServiceService,private productService:ProductServiceService ,private cartService:CartserviceService) {
    this.store.select(selectCustomer).subscribe({
      next:(data:any)=>{this.customer=data[0],this.getCartId()}
    })
    this.productService.getAllProducts().subscribe({
      next:(data:any)=>{this.productsList=data, console.log(this.productsList)}
    })
    
    
   }

  ngOnInit(): void {
  }

  get form() {
    return this.editForm.controls;
  }

 getCartId(){
   this.cartService.getcartId(this.customer.custId).subscribe({
     next:(data:any)=>{this.cartId=data,this.getCustCart()}
   })
 }

 getCustCart(){
  this.cartService.getCartOfCustomer(this.cartId).subscribe({
    next:(data:any)=>{this.cart=data,console.log(data)}
  })
 }
 onCheckOfEdit(e:any){
   if(e.target.checked===true){
    this.isEditChecked=false
   }else{
    this.isEditChecked=true
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

  save() {
    //this.userService.createCustomer(this.editedCustomer).subscribe((data:any)=>{console.log(data)})
    this.userService.updateCustomerFeilds(this.editedCustomer.firstName,this.editedCustomer.lastName,this.editedCustomer.password,this.editedCustomer.mobileNum,this.editedCustomer.mailId,this.editedCustomer.custId,this.editedCustomer).subscribe({
      next:(data:any)=>console.log(data)
    })
  }

  async encryptPassword(){
    this.hashedPassword= bcrypt.hashSync(this.editForm.value.newPassword,this.salt);
  }

  onClickOnUserProfileEdit(){
    this.toggleTabs=false;
  }
  onClickOnOrders(){
    this.toggleTabs=true;
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
