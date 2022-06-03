import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addProduct } from 'src/app/cart-state-store/cart.actions';
import { productsCount, selectGroupedCartEntries } from 'src/app/cart-state-store/cart.selector';
import { Product } from 'src/app/EntityModels/Product';
import { StoreserviceService } from 'src/app/services_folder/storeservice.service';

@Component({
  selector: 'app-specificproduct',
  templateUrl: './specificproduct.component.html',
  styleUrls: ['./specificproduct.component.css']
})
export class SpecificproductComponent implements OnInit {

  product :Product = new Product();
  validatingProduct:Product=new Product();
  quantity:number=0;

 
  constructor(private storeService:StoreserviceService, private store: Store) {
    this.getTheProduct()
  }

  ngOnInit(): void {
    this.getTheProduct()
  }

  getTheProduct(){
    this.product=this.storeService.getProduct();
  }

  updateQuantity(e:any){
    this.quantity=e.target.value
  }

  addToCart(){
    this.storeService.setCartProducts(this.product)
    this.store.dispatch(addProduct(this.product))
    this.store.select(selectGroupedCartEntries).subscribe((data:any)=>(console.log(data)))
  }

}
