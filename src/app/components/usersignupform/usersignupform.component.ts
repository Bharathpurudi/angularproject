import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup,  Validators} from '@angular/forms';



@Component({
  selector: 'usersignupform',
  templateUrl: './usersignupform.component.html',
  styleUrls: ['./usersignupform.component.css']
})
export class UsersignupformComponent implements OnInit {
  
  constructor(private datePipe :DatePipe) { }

  ngOnInit() {
  }

  currentDate = new Date();
  minDateRaw = new Date().setDate(this.currentDate.getDate() - 36500);
  minDate= new Date(this.minDateRaw).toLocaleDateString()
  formattedMinDate = this.datePipe.transform(this.minDate, 'yyyy-MM-dd');
  maxDateRaw =new Date().setDate(this.currentDate.getDate() - 6570);
  maxDate= new Date(this.maxDateRaw).toLocaleDateString()
  formattedMaxDate = this.datePipe.transform(this.maxDate, 'yyyy-MM-dd');
  
  signUpForm = new FormGroup({
    firstName: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    lastName: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    userName: new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]),
    confirmPassword:new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]),
    mobileNum: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],),
    dateOfBirth: new FormControl('',[Validators.required])
  },

);
 
  submitted:boolean = false;
  password:String="";
  confirmPassword:String="";
  isPasswordMatched:boolean=false;

  onEnterPassword(e:any){
    this.password= e.target.value
  }

  onEnterConfirmPassword(e:any){
    this.confirmPassword= e.target.value
  }


  paswordMatch(e:any){
    if(this.password==this.confirmPassword){
      this.isPasswordMatched=true
    }else{
      this.isPasswordMatched=false
    }
      
   
  }

  get form() {
    return this.signUpForm.controls;
  }

  onSubmit(){
    this.submitted=true
    if(this.signUpForm.valid){
      console.log(JSON.stringify(this.signUpForm.value))
    } else {
      alert('User form is not valid!!')
      console.log(this.formattedMinDate);
      console.log(this.isPasswordMatched)
    }
  }

}
