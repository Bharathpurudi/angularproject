import { createAction, props } from "@ngrx/store";
import { Customer } from "../EntityModels/Customer";


export const createCustomer=createAction('Create Customer',props<Customer>());
export const removeCustomer=createAction('Remove Customer')
