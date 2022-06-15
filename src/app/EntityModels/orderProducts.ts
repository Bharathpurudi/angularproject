export class OrderProducts{
    orderProductsId:number= 0;
        productId:number= 0;
        quantity:number= 0;

    constructor (orderProductsId:number,productId:number,quantity:number){
        this.orderProductsId=orderProductsId;
        this.productId=productId;
        this.quantity=quantity;
    }
}