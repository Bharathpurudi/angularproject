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
       next:(data:any)=>{this.customer=data,this.validateLogin(data),console.log(data)}
     }
    )
  }

   validateLogin(data:any) {
    if ((data.userName === this.state.userName) && (bcrypt.compareSync(this.state.password,data.password))) {
      this.customerStateSet();
      const requestBody={userName:this.state.userName,userId:data.userId,email:data.email}
      this.authService.generateToken(requestBody).subscribe((data)=>{
        const parsedData = JSON.parse(data);
        this.cookies.set('jwt_token', parsedData.JWT,{expires:30})
      })
      this.gotoHome()
      this.state.errorMsg = ""
    } else {
      this.state.errorMsg = "Wrong Login Credentials"
      console.log(data.password)
      console.log(bcrypt.compareSync(data.password,this.state.password))
    }
  }

  onSubmit(loginForm: NgForm) {
    if (this.state.userName == "" && this.state.password == "") {
      this.state.errorMsg = "Enter The User Credentials"
    } else {
      this.getCustomerDetails();
    }
  }

  gotoHome() {
    this.router.navigate(['/home']);
  }

  goToSignUp(){
    this.router.navigate(['/signup']);
  }


}
