import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CategoryProduct } from 'app/entities/category-product'
import { CategoryProductService } from 'app/services/category-product.service'

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss',
    '../../../../assets/admin/css/paper-dashboard.css',
  '../../../../assets/admin/demo/demo.css',
  '../../../../assets/admin/css/bootstrap.min.css',]
})
export class AddCategoryComponent implements OnInit {
  category: CategoryProduct = new CategoryProduct();

  constructor(
    private categoryService: CategoryProductService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  addCategory(): void {
    this.categoryService.addCategorie(this.category).subscribe(() => {
      this.router.navigate(['/listCategory']);
    });
  }


}

