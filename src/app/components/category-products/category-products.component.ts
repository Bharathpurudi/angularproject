import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/EntityModels/Product';
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

  currentProduct :Product= new Product();
  tempProdList:Product[]=[];

  ngOnInit(): void {
    this.renderProducts(this.category)
    this.productsFound=this.storeService.getProductsFoundVar();
  }

  category:string='';
  productsList:any[]|any;
  productsFound:boolean=false;

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
    this.router.navigate(['/specificproduct'])
  }

}
