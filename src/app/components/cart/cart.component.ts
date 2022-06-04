import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectGroupedCartEntries } from 'src/app/cart-state-store/cart.selector';
import { Product } from 'src/app/EntityModels/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private store: Store) {
    this.store.select(selectGroupedCartEntries).subscribe((data:any)=>(this.cartProducts=data))
   }

  cartProducts:Product[]=[];

  ngOnInit(): void {
    console.log(this.cartProducts)
  }
  

}
