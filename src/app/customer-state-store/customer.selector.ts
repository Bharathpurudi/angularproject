import { createFeatureSelector,createSelector } from "@ngrx/store";
import { Customer } from "../EntityModels/Customer";


export const selectCustomer = createSelector(
    createFeatureSelector('customerEntries'),
    (state: Customer[]) => {
      return [...state]
    }
  )