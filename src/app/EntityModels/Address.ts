import { RefCustomer } from "./RefCust";

export class Address{
        addressId:number= 0;
        city:string= "";
        customer:RefCustomer={
            custId: 0
        };
        doorNo:string= "";
        pincode:number= 0;
        state:string= "";
        streetName:string= "";

        constructor(addressId:number,city:string,custId:number,doorNo:string,pincode:number,state:string,streetName:string){
            this.addressId=addressId;
            this.city=city;
            this.customer.custId=custId;
            this.doorNo=doorNo;
            this.pincode=pincode;
            this.state=state;
            this.streetName=streetName;
        }


}