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
      var map: Map<number, ProductGroup> = new Map;
  
      state.forEach(p => {
        if (map.get(p.productId)) {
          (map.get(p.productId) as ProductGroup).count++;
        } else {
          map.set(p.productId, { product: p, count: 1 });
        }
      })
  
      const sortedMap = new Map([...map.entries()].sort());
      return Array.from(sortedMap.values());
    }
  )