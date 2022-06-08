import { OrderProducts } from "./OrderProducts";

export class OrderEntity{
    checkoutAmount:number= 0;
    invoiceNum:number= 0;
    orderAmount:number= 0;
    orderDate:string|null="";
    orderDiscount:number= 0;
    orderId:number= 0;
    orderProducts:OrderProducts[]=[]; 
    
    constructor(checkoutAmount:number,invoiceNum:number,orderAmount:number,orderDate:string|null,orderDiscount:number,orderId:number,orderProducts:OrderProducts[]){
        this.checkoutAmount=checkoutAmount;
        this.invoiceNum=invoiceNum;
        this.orderAmount=orderAmount;
        this.orderDate=orderDate;
        this.orderDiscount=orderDiscount;
        this.orderId=orderId
        this.orderProducts=orderProducts
    
    }
}