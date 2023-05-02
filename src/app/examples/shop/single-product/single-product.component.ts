import { Component, OnInit } from '@angular/core';
import { Product } from 'app/entities/product';
import { ProductService } from 'app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  productList: Array<Product> = [];
  id!:number;



  constructor(
    public productService: ProductService,
    public product: Product,
    private route: ActivatedRoute){}

  
    ngOnInit(): void {
      
      
   }

  getProducts(): void {
    this.productService.getProductList().subscribe((data: Product[]) => {
      this.productList = data;
    });
  }

  getProduct(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe((data) => {
      this.product = data;
    });
  }


}

