import { Component } from '@angular/core';
import { CategoryProduct } from 'app/entities/category-product';
import { CategoryProductService } from 'app/services/category-product.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss',
  '../../../../assets/admin/css/paper-dashboard.css',
  '../../../../assets/admin/demo/demo.css',
  '../../../../assets/admin/css/bootstrap.min.css',]
})
export class ListCategoryComponent {
  listCategory : Array<CategoryProduct>=[];
  selectedCategory =null;
  constructor(private categoryService:CategoryProductService) { }

  ngOnInit(): void {
    return this.getAllCategories();
  }
  getAllCategories(): void {
    this.categoryService.getProductCategories().subscribe((data:CategoryProduct[])=>{
      this.listCategory=data;
    })

}

remove(id: number):void {
  this.categoryService.deleteCategory(id).subscribe(()=>  (this.listCategory=this.listCategory.filter((t)=>t.id !==id)));
}

}
