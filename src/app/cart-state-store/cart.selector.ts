import { Product } from "../EntityModels/Product";
import { createFeatureSelector,createSelector } from "@ngrx/store";
import { OrderProducts } from "../EntityModels/OrderProducts";

export interface ProductGroup {
    product: Product;
    count: number;
  }
export const productsCount=createSelector(
    createFeatureSelector('cartEntries'),
    (state:Product[])=>{
        return state.length;
    }
);


export const selectGroupedCartEntries = createSelector(
    createFeatureSelector('cartEntries'),
    (state: Product[]) => {
      return [...state]
    }
  )

  export const selectUpdtQtyCartEntries = createSelector(
    createFeatureSelector('updtCartEntries'),
    (state: OrderProducts[])=>{
      return [...state]
    }
  )

export const selectCartId=createSelector(
  createFeatureSelector('cartIdEntry'),
  (state:Number)=>{
    return state;
  }
)