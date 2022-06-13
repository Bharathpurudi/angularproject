import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { selectCustomer } from 'src/app/customer-state-store/customer.selector';
import { Customer } from 'src/app/EntityModels/Customer';
import { Product } from 'src/app/EntityModels/Product';
import { ProductServiceService } from 'src/app/services_folder/product-service.service';
import { StoreserviceService } from 'src/app/services_folder/storeservice.service';

@Component({
  selector: 'category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {

  constructor(private router:Router,private cookies:CookieService,private store:Store, private productService:ProductServiceService,private storeService:StoreserviceService) { 
    this.category=storeService.getMyVariable();
    this.productsFound=storeService.getProductsFoundVar();
    this.store.select(selectCustomer).subscribe((data:any)=>(this.customer=data[0]))
  }

  currentProduct :Product= new Product();
  tempProdList:Product[]=[];

  ngOnInit(): void {
    this.renderProducts(this.category)
    this.productsFound=this.storeService.getProductsFoundVar();
  }

  category:string='';
  productsList:any[]|any;
  productsFound:boolean=false;
  customer:Customer=new Customer;

  renderProducts(category:string){
    if(this.productsFound===true){
      this.productService.getProducts(category).subscribe((data:any)=>{this.productsList=data})
    }else{
      this.productsList=this.storeService.getProductsList();
    }
    
  }

  specificProduct(productName:string){
    this.tempProdList=this.productsList.filter((product: { productName: string; })=>product.productName===productName)
    this.currentProduct=this.tempProdList[0];
    this.storeService.setProduct(this.currentProduct);
    const jwtToken = this.cookies.get('jwt_token')
    const parsedJwt = JSON.parse(atob(jwtToken.split('.')[1]))
    if(parsedJwt.userName===this.customer.userName){
      this.router.navigate(['/specificproduct'])
    }
    
  }

}
