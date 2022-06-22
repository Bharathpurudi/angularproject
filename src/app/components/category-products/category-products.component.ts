import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { specifcProduct } from 'src/app/cart-state-store/cart.actions';
import { selectFilteredProducts } from 'src/app/cart-state-store/cart.selector';
import { selectCustomer } from 'src/app/customer-state-store/customer.selector';
import { Customer } from 'src/app/EntityModels/Customer';
import { Product } from 'src/app/EntityModels/Product';
import { ProductServiceService } from 'src/app/services_folder/product-service.service';


@Component({
  selector: 'category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {

  constructor(private router:Router, private cookies:CookieService,private store:Store, private productService:ProductServiceService) { 
    this.store.select(selectCustomer).subscribe((data:any)=>(this.customer=data[0]))
    this.store.select(selectFilteredProducts).subscribe({
      next:(data:any)=>{this.productsList=this.objDestructure(data),this.validateProductsList(data)}
    })
  }

  

  ngOnInit(): void {
    
  }

  tempProdList:Product[]=[];
  productsList:any[]|any;
  customer:Customer=new Customer;
  isNoProducts:boolean=true;

  
  objDestructure(data:any){
    let desList:any[]=Object.keys(data).map((key) => data[key]);
    return desList.filter(e=>typeof(e)==="object");
  }

  validateProductsList(data:any){
    let desList:any[]=Object.keys(data).map((key) => data[key]);
    const tempList=desList.filter(e=>typeof(e)==="object")
    if(tempList.length<=0){
      this.isNoProducts=false
    }else{
      this.isNoProducts=true
    }
    
  }

  specificProduct(productName:string){
    this.tempProdList=this.productsList.filter((product: { productName: string; })=>product.productName===productName)
    this.store.dispatch(specifcProduct(this.tempProdList[0]))
    this.router.navigate(['/specificproduct'])
  }
}
