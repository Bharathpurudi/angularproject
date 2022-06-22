import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { filteredProducts } from 'src/app/cart-state-store/cart.actions';
import { productsCount } from 'src/app/cart-state-store/cart.selector';
import { removeCustomer } from 'src/app/customer-state-store/customer.action';
import { Product } from 'src/app/EntityModels/Product';
import { ProductServiceService } from 'src/app/services_folder/product-service.service';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  countProducts$:Observable<number>;
  constructor(private router: Router,private productService:ProductServiceService,private cookies:CookieService, private store:Store) {
    this.countProducts$=store.select(productsCount)
   }
  categoriesArray:string[]=["Electronics","Grocery","Fashion","Appliances","Beauty","Furniture"];

  ngOnInit(): void {
  }

  searchedInput:string='';
  productsList:Product[]=[];

  logoutFunction(){
    this.router.navigate(['/login']);
    this.store.dispatch(removeCustomer())
    this.cookies.delete('jwt_token')
    window.localStorage.clear();
  }

  homePage(){
    this.router.navigate(['/home']);
  }
  goToCart(){
    this.router.navigate(['/cart']);
  }
  goToUserProfile(){
    this.router.navigate(['/user-profile']);
  }

  productsPage(){
    this.router.navigate(['/products']);
  }

  onSearch(e:any){
    this.searchedInput=e.target.value
  }

  storeProducts(data:any){
    this.store.dispatch(filteredProducts(data))
  }

  capitalizeFirstLetter(value:string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  onsubmitSearch(){
    
    if(this.categoriesArray.includes(this.capitalizeFirstLetter(this.searchedInput))){
      this.productService.getProducts(this.searchedInput).subscribe({
        next:(data:any)=>{this.storeProducts(data),this.productsPage()
        }
      })
    }else{
      let tempProductsList:Product[]=[]
      this.productService.getAllProducts().subscribe({
        next:(data:any)=> {tempProductsList=data,
          this.productsList=tempProductsList.filter(e=>e.productName.toLocaleLowerCase().includes(this.searchedInput)),
          this.storeProducts(this.productsList),
          this.productsPage()
          }
      })
    }
    
  }

}
