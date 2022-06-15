import { OrderEntity } from "./OrderEntity";
import { RefCustomer } from "./RefCust";

export class Cart{
    cartId:number=0;
    customer:RefCustomer={
        custId: 0
    };
    orderEntities:OrderEntity[]=[];

    constructor(cartId:number,custId:number,orderEntities:OrderEntity[]){
        this.cartId=cartId;
        this.customer.custId=custId;
        this.orderEntities=orderEntities;
    }
}
