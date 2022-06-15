import { createAction, props } from "@ngrx/store";
import { OrderProducts } from "../EntityModels/OrderProducts";
import { Product } from "../EntityModels/Product";


export const addProduct=createAction('Add Product',props<Product>());
export const removeProduct=createAction('Remove Product', props<Product>())
export const clearCart=createAction('Clear Cart')
export const cartId=createAction('Cart Id', props<Number>())
export const addUpdatedQunatityProduct=createAction('Add Updated Qty Prod', props<OrderProducts>())
export const updateCartProductQuantity= createAction('update Qty', props<Number>())
export const removeUpdatedQtyProd=createAction('Remove updated Qty', props<OrderProducts>())
