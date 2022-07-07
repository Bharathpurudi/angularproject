import { OrderProducts } from "./OrderProducts";

export class OrderEntity{
    checkoutAmount:number= 0;
    invoiceNum:string= "";
    orderAmount:number= 0;
    orderDate:string|null="";
    orderDiscount:number= 0;
    orderId:number= 0;
    addressId:number=0;
    orderProducts:OrderProducts[]=[]; 
    
    constructor(checkoutAmount:number,invoiceNum:string,orderAmount:number,orderDate:string|null,orderDiscount:number,orderId:number,orderProducts:OrderProducts[],addressId:number){
        this.checkoutAmount=checkoutAmount;
        this.invoiceNum=invoiceNum;
        this.orderAmount=orderAmount;
        this.orderDate=orderDate;
        this.orderDiscount=orderDiscount;
        this.orderId=orderId;
        this.orderProducts=orderProducts;
        this.addressId=addressId;
    }
}