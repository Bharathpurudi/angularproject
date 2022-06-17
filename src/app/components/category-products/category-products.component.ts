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
import { StoreserviceService } from 'src/app/services_folder/storeservice.service';

@Component({
  selector: 'category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {

  constructor(private router:Router, private cookies:CookieService,private store:Store, private productService:ProductServiceService,private storeService:StoreserviceService) { 
    this.category=storeService.getMyVariable();
    this.productsFound=storeService.getProductsFoundVar();
    this.store.select(selectCustomer).subscribe((data:any)=>(this.customer=data[0]))
    this.renderProducts(this.category)
    this.store.select(selectFilteredProducts).subscribe({
      next:(data:any)=>{console.log(data),console.log(this.objDestructure(data))}
    })
  }

  

  ngOnInit(): void {
    
  }
  currentProduct :Product= new Product();
  tempProdList:Product[]=[];
  category:string='';
  productsList:any[]|any;
  productsFound:boolean=false;
  customer:Customer=new Customer;
  isNoProducts:boolean=true;
  productsListLength:number=0;

  renderProducts(category:string){
    if(this.productsFound===true){
      this.productService.getProducts(category).subscribe({
        next:(data:any)=>{this.productsList=data,
          this.storeService.setProductsFoundVar(false),
          this.productsListLength=this.productsList.length,
          this.validateProductsList()
        }
      })
    }else{
      let tempProductsList:Product[]=[]
      this.productService.getAllProducts().subscribe({
        next:(data:any)=> {tempProductsList=data,
          this.productsList=tempProductsList.filter(e=>e.productName.toLocaleLowerCase().includes(category)),
          this.storeService.setProductsFoundVar(true),
          this.productsListLength=this.productsList.length,
          this.validateProductsList()
          }
      })
      
      
    }
    
  }


  objDestructure(data:any){
    const desList:any[]=Object.keys(data).map((key) => data[key]);
    return desList;

  }

  validateProductsList(){
    if(this.productsListLength===0){
      this.isNoProducts=false;
    }
  }

  specificProduct(productName:string){
    this.tempProdList=this.productsList.filter((product: { productName: string; })=>product.productName===productName)
    this.currentProduct=this.tempProdList[0];
    this.store.dispatch(specifcProduct(this.currentProduct))
    this.storeService.setProduct(this.currentProduct);
    this.router.navigate(['/specificproduct'])
  }

}
