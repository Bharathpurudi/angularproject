import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { JsonWebTokenError } from 'jsonwebtoken';
import { CookieService } from 'ngx-cookie-service';
import { createCustomer } from 'src/app/customer-state-store/customer.action';
import { Customer } from 'src/app/EntityModels/Customer';
import { AuthServiceService } from 'src/app/services_folder/auth-service.service';
import { UserServiceService } from 'src/app/services_folder/userService.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  state = { userName: "", password: "", passwordType: "password", errorMsg: "", isLogin:false}
  updateState={updateUserName:"",newPassword:"",confirmPassword:""}
  isForgotPasswordClicked:boolean=false;
  salt = bcrypt.genSaltSync(10);

  customer: Customer = new Customer;

  loginForm = NgForm

  constructor(private router: Router, private userService: UserServiceService, private store:Store, private authService:AuthServiceService,
  private cookies:CookieService) { }

  ngOnInit(): void {
  }

  onChange(e: any) {
    if (e.target.checked == true) {
      this.state.passwordType = "text"
    } else {
      this.state.passwordType = "password"
    }
  }


  customerStateSet(){
    this.store.dispatch(createCustomer(this.customer))
  };

  getCustomerDetails() {
    this.userService.getCustomer(this.state.userName).subscribe(
     {
       next:(data:any)=>{this.customer=data,this.validateLogin(data)}
     }
    )
  }

  forgotPassword(){
    this.isForgotPasswordClicked=true
  }

  validateForgotPassword(data:any){
    if(data!=null){
      alert("Password updated sucessfully")
      this.isForgotPasswordClicked=false
    }else{
      alert("No user name found")
    }
  }

  updatePassword(){
    if(this.updateState.updateUserName=="" && this.updateState.newPassword=="" && this.updateState.confirmPassword==""){
      this.state.errorMsg="Enter the correct Credentials"
    }else if(this.updateState.newPassword!=this.updateState.confirmPassword){
      this.state.errorMsg="Entered Passwords are not matching"
    }else{
      const encryptedNewPassword=bcrypt.hashSync(this.updateState.confirmPassword,this.salt);
      this.userService.updateCustPassword(this.updateState.updateUserName,encryptedNewPassword,this.customer).subscribe({
        next:(data:any)=>{
          {this.validateForgotPassword(data)}
        }
      })
    }
  }

   validateLogin(data:any) {
    if ((data.userName === this.state.userName) && (bcrypt.compareSync(this.state.password,data.password))) {
      this.state.errorMsg = ""
      this.customerStateSet();
      const requestBody={userName:this.state.userName,userId:data.userId,email:data.email}
      this.authService.generateToken(requestBody).subscribe({
        next: (data)=>{
        const parsedData = JSON.parse(data)
        this.cookies.set('jwt_token', parsedData.JWT,{expires:3})
        this.gotoHome()
        }
      })
     
    } else {
      this.state.errorMsg = "Wrong Login Credentials"
    }
  }

  onSubmit(loginForm: NgForm) {
    if (this.state.userName == "" && this.state.password == "") {
      this.state.errorMsg = "Enter The User Credentials"
    } else {
      this.getCustomerDetails();
    }
  }

  backToLogin(){
    this.isForgotPasswordClicked=false;
  }

  gotoHome() {
    this.router.navigate(['/home']);
  }

  goToSignUp(){
    this.router.navigate(['/signup']);
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }



}
