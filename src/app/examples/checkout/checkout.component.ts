import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'app/entities/cart-item';
import { Product } from 'app/entities/product';
import { CartService } from 'app/services/cart.service';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cartItems: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '{}');
  // localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems') || '{}') : [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  product: Product = new Product();
  files: any = [];
  id!: number;

}
