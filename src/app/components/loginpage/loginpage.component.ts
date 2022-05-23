import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  state = { userName: "", password: "", passwordType: "password", errorMsg:"" }

  userCredentials={}

  loginForm = NgForm

  constructor() { }

  ngOnInit(): void {
  }

  onEnterUserName(e:any){
    this.state.userName=e.target.value
  }

  onEnterPassword(e:any){
    this.state.password=e.target.value
  }

  onChange(e:any){
    if(e.target.checked==true){
      this.state.passwordType="text"
    }else{
      this.state.passwordType="password"
    }
  }

  onSubmit(loginForm: NgForm) {
    if(this.state.userName==""&&this.state.password==""){
      this.state.errorMsg="Enter The correct User Credentials"
    }else{
      this.state.errorMsg=""
    }
    console.log(loginForm.value)
  }


}
