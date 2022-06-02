import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services_folder/product-service.service';
import { StoreserviceService } from 'src/app/services_folder/storeservice.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private storeService:StoreserviceService, private productsService:ProductServiceService) { }

  categoriesArray:string[]=["Electronics","Grocery","Fashion","Appliances","Beauty","Furniture"];

  ngOnInit(): void {
  }

  searchedInput:string='';

  logoutFunction(){
    this.router.navigate(['/login']);
  }

  homePage(){
    this.router.navigate(['/home']);
  }

  productsPage(){
    this.router.navigate(['/products']);
  }

  onSearch(e:any){
    this.searchedInput=e.target.value
  }

  onsubmitSearch(){
    if(this.categoriesArray.includes(this.searchedInput)){
      this.storeService.setProductsFoundVar(true)
      this.storeService.setMyVariable(this.searchedInput);
      this.productsPage()
    }else{
      this.storeService.setProductsFoundVar(false)
      this.productsService.getProductsLike(this.searchedInput).subscribe((data:any)=>{this.storeService.setProductsList(data)})
      this.productsPage()
    }
    
  }

}
