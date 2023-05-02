import { Component, Input } from '@angular/core';
import { ProductService } from 'app/services/product.service';
import { CategoryProductService } from 'app/services/category-product.service';
import { Product } from 'app/entities/product';
import { CategoryProduct } from 'app/entities/category-product';



@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.scss']
})
export class CategoryProductComponent {

  categories!: CategoryProduct[];
  productList: Array<Product> = [];
  @Input() products!: Product[];
 
  minPrice: number = 0;
  maxPrice: number = 0;
  constructor(private categoryProductService: CategoryProductService,public productService:ProductService) { }

  ngOnInit(): void {
    this.categoriesProductList();
    
  }
  categoriesProductList() {
    this.categoryProductService.getProductCategories().subscribe(data => {
      this.categories = data
    })
  }
  getProductsbyPrice(minPrice : number, maxPrice : number): void {
    this.productService.getProductsbyPrice(this.minPrice,this.maxPrice).subscribe((data: Product[]) => {
      this.productList = data;
    });
  }
}
