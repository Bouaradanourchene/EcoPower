import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Product } from 'app/entities/product';
import { ProductService } from 'app/services/product.service';
import { CategoryProduct } from 'app/entities/category-product';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: [
    './list-product.component.scss',
    '../../../../assets/admin/css/paper-dashboard.css',
    '../../../../assets/admin/demo/demo.css',
    '../../../../assets/admin/css/bootstrap.min.css',
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})

export class ListProductComponent {
  productList: Array<Product> = [];
  constructor(public productService: ProductService) {}
ngOnInit(): void {
  return this.getProducts();
}
getProducts(): void {
  this.productService.getProductList().subscribe((data: Product[]) => {
    this.productList = data;
  });
}


onDelete(product: Product) {
  this.productService
    .deleteProduct(product)
    .subscribe(
      () =>
        (this.productList = this.productList.filter(
          (t) => t.id !== product.id
        ))
    );
}
}
