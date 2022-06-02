import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services_folder/product-service.service';
import { StoreserviceService } from 'src/app/services_folder/storeservice.service';

@Component({
  selector: 'category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {

  constructor(private router:Router, private productService:ProductServiceService,private storeService:StoreserviceService) { 
    this.category=storeService.getMyVariable();
    this.productsFound=storeService.getProductsFoundVar();
  }

  currentProduct:object={};

  ngOnInit(): void {
    this.renderProducts(this.category)
  }

  category:string='';
  productsList:any[]|any;
  productsFound:boolean=false;

  renderProducts(category:string){
    if(this.productsFound===true){
      this.productService.getProducts(category).subscribe((data:any)=>{this.productsList=data,console.log(data)})
    }else{
      this.productsList=this.storeService.getProductsList();
    }
    
  }

  specificProduct(productName:string){
    this.currentProduct=this.productsList.filter((product: { productName: string; })=>product.productName===productName)
    this.storeService.setProduct(this.currentProduct);
    this.router.navigate(['/specificproduct'])
  }

}
