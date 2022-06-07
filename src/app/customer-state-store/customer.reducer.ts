import { ActionReducer, createReducer,INIT,on, UPDATE } from "@ngrx/store";
import { Customer } from "../EntityModels/Customer";
import {createCustomer,removeCustomer} from  "./customer.action";

export const initialCustomer: Customer[]=[];

export const customerReducer=createReducer(
    initialCustomer,

    on(removeCustomer, _ =>[]),

    on(createCustomer,(entries,customer)=>{
        const addedCustomer:Customer[]=JSON.parse(JSON.stringify(entries))
        addedCustomer.push(customer)
        return addedCustomer;
    }),
)
