import { ActionReducer, createReducer,INIT,on, UPDATE } from "@ngrx/store";
import { Product } from "../EntityModels/Product";
import { addProduct,removeProduct,clearCart, getProducts} from "./cart.actions";

export const initialCartProducts:Product[]=[];

export const cartReducer=createReducer(
initialCartProducts,

on(clearCart, _ =>[]),


on(addProduct,(entries,product)=>{
    const entriesClone:Product[]=JSON.parse(JSON.stringify(entries))
    entriesClone.push(product)
    return entriesClone;
}),

on(removeProduct,(entries,product)=>{
    const entriesClone:Product[]=JSON.parse(JSON.stringify(entries))
    const found=entriesClone.find(e=>e.productId===product.productId)
    if(found){
        entriesClone.splice(entriesClone.indexOf(found),1)
    }
    return entriesClone;
    
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