import { state } from "@angular/animations";
import { ActionReducer, createReducer,INIT,on, UPDATE } from "@ngrx/store";
import { Product } from "../EntityModels/Product";
import { addProduct,removeProduct,clearCart, cartId} from "./cart.actions";

export const initialCartProducts:Product[]=[];

export const initialCartId:Number=0;

export const cartReducer=createReducer(
initialCartProducts,

on(clearCart, _ =>[]),


on(addProduct,(entries,product)=>{
    const addedProducts:Product[]=JSON.parse(JSON.stringify(entries))
    addedProducts.push(product)
    return addedProducts;
}),

on(removeProduct,(entries,product)=>{
    const addedProducts:Product[]=JSON.parse(JSON.stringify(entries))
    const found=addedProducts.find(e=>e.productId===product.productId)
    if(found){
      addedProducts.splice(addedProducts.indexOf(found),1)
    }
    return addedProducts;
})
)

export const cartIdReducer=createReducer(
  initialCartId,
  on(cartId,(entry,number)=>
  {let num=entry;
    num=number;
    return num;
  })



  
)


export const metaReducerLocalStorage = (reducer: ActionReducer<any>): ActionReducer<any> => {
    return (state, action) => {
      if (action.type === INIT || action.type == UPDATE) {
        const storageValue = localStorage.getItem("state");
        if (storageValue) {
          try {
            return JSON.parse(storageValue);
          } catch {
            localStorage.removeItem("state");
          }
        }
      }
      const nextState = reducer(state, action);
      localStorage.setItem("state", JSON.stringify(nextState));
      return nextState;
    };
  };