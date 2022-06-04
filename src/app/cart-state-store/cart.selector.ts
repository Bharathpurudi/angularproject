import { Product } from "../EntityModels/Product";
import { createFeatureSelector,createSelector } from "@ngrx/store";

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