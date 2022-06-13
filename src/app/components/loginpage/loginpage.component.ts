import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createCustomer } from 'src/app/customer-state-store/customer.action';
import { Customer } from 'src/app/EntityModels/Customer';
import { AuthServiceService } from 'src/app/services_folder/auth-service.service';
import { UserServiceService } from 'src/app/services_folder/userService.service';

@Component({
  selector: 'loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  state = { userName: "", password: "", passwordType: "password", errorMsg: "", isLogin:false}

  customer: Customer = new Customer;

  loginForm = NgForm

  constructor(private router: Router, private userService: UserServiceService, private store:Store, private authService:AuthServiceService
  ) { }

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
    this.customer = new Customer();
    this.userService.getCustomer(this.state.userName, this.state.password).subscribe((data: any) => {
      this.customer=data,
      this.validateLogin()
    }
    )
  }

   validateLogin() {
    if (this.customer.userName === this.state.userName && this.customer.password === this.state.password) {
      this.customerStateSet();
      const requestBody={userName:this.state.userName,password:this.state.password}
      this.authService.generateToken(requestBody).subscribe((data)=>{
        const parsedData = JSON.parse(data);
      })
      this.gotoHome()
      this.state.errorMsg = ""
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

  gotoHome() {
    this.router.navigate(['/home']);
  }

  goToSignUp(){
    this.router.navigate(['/signup']);
  }


}
