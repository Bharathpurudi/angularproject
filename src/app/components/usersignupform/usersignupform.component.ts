import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Customer } from 'src/app/EntityModels/Customer';
import { UserServiceService } from 'src/app/services_folder/userService.service';
import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'usersignupform',
  templateUrl: './usersignupform.component.html',
  styleUrls: ['./usersignupform.component.css']
})
export class UsersignupformComponent implements OnInit {

  constructor(private datePipe: DatePipe, private userService: UserServiceService, private router: Router) { }

  ngOnInit() {
  }
  submitted: boolean = false;
  password: String = "";
  confirmPassword: String = "";
  isPasswordMatched: boolean = false;
  customer:Customer = new Customer;
  hashedPassword:string='';
  salt = bcrypt.genSaltSync(10);


  currentDate = new Date(); 
  minDateRaw = new Date().setDate(this.currentDate.getDate() - 36500);
  minDate = new Date(this.minDateRaw).toLocaleDateString()
  formattedMinDate = this.datePipe.transform(this.minDate, 'yyyy-MM-dd');
  maxDateRaw = new Date().setDate(this.currentDate.getDate() - 6570);
  maxDate = new Date(this.maxDateRaw).toLocaleDateString()
  formattedMaxDate = this.datePipe.transform(this.maxDate, 'yyyy-MM-dd');

  signUpForm = new UntypedFormGroup({
    firstName: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    lastName: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    gender: new UntypedFormControl(''),
    userName: new UntypedFormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]),
    mailId: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]),
    confirmPassword: new UntypedFormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]),
    mobileNum: new UntypedFormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],),
    dateOfBirth: new UntypedFormControl('', [Validators.required])
  },

  );



  save() {
    this.userService.createCustomer(this.customer).subscribe({
      next:(data:any)=>{ console.log(data)}
    })
  }

  onEnterPassword(e: any) {
    this.password = e.target.value
  }

  onEnterConfirmPassword(e: any) {
    this.confirmPassword = e.target.value
  }


  paswordMatch(e: any) {
    if (this.password == this.confirmPassword) {
      this.isPasswordMatched = true
    } else {
      this.isPasswordMatched = false
    }
  }

  get form() {
    return this.signUpForm.controls;
  }

  goToLoginPage() {
    this.router.navigate(['login']);
  }

  onSubmit() {
    this.submitted = true
    if (this.signUpForm.valid) {
      this.customer=this.signUpForm.value;
      this.hashedPassword= bcrypt.hashSync(this.customer.password,this.salt);
      this.customer.password=this.hashedPassword;
      this.save();
      alert("User Created Sucessfully")
      this.goToLoginPage()
      
    } else {
      alert('User form is not valid!!')
    }
  }

}
