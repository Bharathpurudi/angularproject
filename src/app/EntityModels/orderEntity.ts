import { orderProducts } from "./orderProducts";

export class orderEntity{
    checkoutAmount:number= 0;
    invoiceNum:number= 0;
    orderAmount:number= 0;
    orderDate:string="";
    orderDiscount:number= 0;
    orderId:number= 0;
    orderProducts:orderProducts[]=[];     
}