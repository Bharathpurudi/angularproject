import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { filteredProducts } from 'src/app/cart-state-store/cart.actions';
import { selectCustomer } from 'src/app/customer-state-store/customer.selector';
import { Customer } from 'src/app/EntityModels/Customer';
import { ProductServiceService } from 'src/app/services_folder/product-service.service';
import { StoreserviceService } from 'src/app/services_folder/storeservice.service';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router:Router, private productService:ProductServiceService,private cookies:CookieService, private storeService:StoreserviceService, private store:Store) { 
    this.store.select(selectCustomer).subscribe((data:any)=>(this.customer=data[0]))
  }

  ngOnInit(): void {
  }

customer : Customer = new Customer();

  catogoriesList: any[]=[
    {
      "catId":1,
      "catName":"Electronics",
      "catUrl":"https://res.cloudinary.com/dhyg2tdfb/image/upload/v1653549948/electronics_g9bpqa.jpg"
    },
    {
      "catId":2,
      "catName":"Grocery",
      "catUrl":"https://res.cloudinary.com/dhyg2tdfb/image/upload/v1653555382/grocery_fykhhh.jpg"
    },
    {
      "catId":3,
      "catName":"Fashion",
      "catUrl":"https://res.cloudinary.com/dhyg2tdfb/image/upload/v1653549948/fashion_a7weeg.jpg"
    },
    {
      "catId":4,
      "catName":"Appliances",
      "catUrl":"https://res.cloudinary.com/dhyg2tdfb/image/upload/v1653549948/appliances_m6odvu.jpg"
    },
    {
      "catId":5,
      "catName":"Beauty",
      "catUrl":"https://res.cloudinary.com/dhyg2tdfb/image/upload/v1653549948/beauty_rona63.jpg"
    },
    {
      "catId":6,
      "catName":"Furniture",
      "catUrl":"https://res.cloudinary.com/dhyg2tdfb/image/upload/v1653549948/furniture_rdqo9z.jpg"
    }

  ]

 
  goToProductsPage(){
    this.router.navigate(['/products']);
  }

  storeProducts(data:any){
    this.store.dispatch(filteredProducts(data))
  }

  clickOnCategory(category:string){
    this.productService.getProducts(category).subscribe({
      next:(data:any)=>{this.storeProducts(data)}
    })
    this.storeService.setMyVariable(category);
    this.storeService.setProductsFoundVar(true);
    this.goToProductsPage();
  }


}
