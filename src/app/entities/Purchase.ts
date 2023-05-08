import { Order } from "./order";
import { OrderItem } from "./order-item";
import { Address } from "./Address";
import { User } from "./user";

export class Purchase{
       user:User;
      shippingAddress: Address;
      billingAddress: Address;
      order: Order;
      orderItem: OrderItem[]; 
  }