import { Order } from "@stripe/stripe-js";
import { OrderItem } from "./order-item";
import { Address } from "./Address";

export class Achat{
     //User user;
      addressLivraison:Address;
    order!: Order;
    orderItems!: OrderItem[]; }