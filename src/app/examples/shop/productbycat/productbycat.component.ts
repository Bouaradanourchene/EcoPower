import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'app/entities/product';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-productbycat',
  templateUrl: './productbycat.component.html',
  styleUrls: ['./productbycat.component.scss']
})
export class ProductbycatComponent {
  products: Product[] = [];
  files: any = [];
  id!: number;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
   
  ) {}

  ngOnInit(): void {
    //relodaing page
    this.route.params.subscribe((params) => {
      this.getProductByCategory();
    });
  //  this.getProductImages();
  }
  getProductByCategory() {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductByCategory(this.id).subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }
  getProductImages() {
    this.id = this.route.snapshot.params['id'];
    this.productService.getImagesByProducts(this.id).subscribe((data) => {
      this.files = data;
    });
  }
  getProductList() {
    
    
  }


}
