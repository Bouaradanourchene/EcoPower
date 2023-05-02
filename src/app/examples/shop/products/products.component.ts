import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'app/entities/cart-item';
import { CategoryProduct } from 'app/entities/category-product';
import { Product } from 'app/entities/product';
import { CartService } from 'app/services/cart.service';
import { ProductService } from 'app/services/product.service';
import { WishListService } from 'app/services/wish-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'
 ]
})
export class ProductsComponent implements OnInit{

  @Input() products: Product[] = [];
  productList: Array<Product> = [];
  categoryList: Array<CategoryProduct>=[]
  minPrice: number = 0;
  maxPrice: number = 0;
  id:number = 0;
  Checked: boolean = false;
  files: any = [];
  fav!:Product[];

  constructor(
    public productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private whishListService: WishListService) {}

  ngOnInit(): void {
    this.getProducts();
    console.log(this.getProducts())
  
   
 }
 addToCart(product: Product) {
  const theCartItem = new CartItem(product);
  this.cartService.addToCart(theCartItem);
  Swal.fire({
    'icon': 'success',
    'text': 'Product added successfully !'
  })
  this.router.navigateByUrl("/cart"),
  err => {
    Swal.fire({
      'icon': 'error',
      'text': 'Missed Information !'
    })
  }
}
 
 getProducts(): void {
   this.productService.getProductList().subscribe((data: Product[]) => {
     this.productList = data;
   });
 }
 getProductsbyPrice(minPrice : number, maxPrice : number): void {
   this.productService.getProductsbyPrice(this.minPrice,this.maxPrice).subscribe((data: Product[]) => {
     this.productList = data;
   });
 }

 getProductImages() {
  this.id = this.route.snapshot.params['id'];
  this.productService.getImagesByProducts(this.id).subscribe((data) => {
    this.files = data;
  });
}

addToFav(id: number){
  this.whishListService.addWishList(id).subscribe(data => {
    console.log(data);
  })
}
getfav(){
  this.whishListService.getWishLists().subscribe(data => {
    console.log(data);
    this.fav = data;
  })
}
 


}
