import { Component, OnInit } from '@angular/core';
import { CategoryProduct } from 'app/entities/category-product';
import { Product } from 'app/entities/product';
import { ProductService } from './../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryProductService } from 'app/services/category-product.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss',
  '../../../../assets/admin/css/paper-dashboard.css',
  '../../../../assets/admin/demo/demo.css',
  '../../../../assets/admin/css/bootstrap.min.css']
})
export class UpdateProductComponent implements OnInit {

  id!: number;
  selectedFiles!: FileList;
  product: Product = new Product();
  categories!: CategoryProduct[];
  errorMessage: string = '';
  userFile: any;
  public imagePath: any;
  imgURL: any;
  files: string[] = [];
  images: string[] = [];
  file!: string;
 

  constructor(
    public ProductService: ProductService ,
    private router: Router,
    private categoryProductService: CategoryProductService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.ProductService.getProductById(this.id).subscribe((data) => {
      this.product = data;
    });
    this.categoryProductService.getProductCategories().subscribe((data) => {
      this.categories = data;
    });
    this.infoForm();
    console.log(this.product);
  }

  infoForm() {
    this.ProductService.dataForm = this.fb.group({
      name: [this.product.name, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      prix: [this.product.prix, [Validators.required]],
      quantity: [this.product.quantity, [Validators.required]],
      category: [this.product.category, [Validators.required]],
    });
  }

  addProduct() {
    const formData = new FormData();

    const product = this.ProductService.dataForm.value;
    // formData.append('article', JSON.stringify(product));
    formData.append('product', JSON.stringify(product));

    for (let i = 0; i < this.files.length; i++) {
      formData.append('files', this.files[i]);
      console.log(formData);
    }

    // formData.append('file', this.userFile);
    formData.append('file', this.file);
    this.ProductService.updateTask(formData).subscribe((data) => {
      this.router.navigate(['/admin/listProduct']);
    });
  }

  setNewCategory(category: CategoryProduct): void {
    console.log(category);
    this.ProductService.dataForm.value.category = category;
  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      for (var i = 0; i < event.target.files.length; i++) {
        this.files.push(event.target.files[i]);
      }

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        alert('Only images are supported.');

        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }
  onSelectFirstFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        alert('Only images are supported.');

        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }
}