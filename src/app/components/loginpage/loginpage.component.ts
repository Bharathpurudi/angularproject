import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/EntityModels/Customer';
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

  constructor(private router: Router, private userService: UserServiceService) { }

  ngOnInit(): void {

  }

  onChange(e: any) {
    if (e.target.checked == true) {
      this.state.passwordType = "text"
    } else {
      this.state.passwordType = "password"
    }
  }

  myObservable=this.userService.getCustomer(this.state.userName, this.state.password)
  myObserver = {
    next: (data: any) => {console.log(data),this.customer=data,this.validateLogin()},
    error: (err: string) => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };

  async getCustomerDetails() {
    this.customer = new Customer();
    this.userService.getCustomer(this.state.userName, this.state.password).subscribe((data: any) => {
      console.log(data);
      this.customer = data;
      this.validateLogin();
    }, error => console.log(error)
    )
  }

   validateLogin() {
    if (this.customer.userName === this.state.userName && this.customer.password === this.state.password) {
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
