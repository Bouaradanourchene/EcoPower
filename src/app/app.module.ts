import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { ProductService } from './services/product.service';
import { CategoryProductService } from './services/category-product.service';
import { HttpClientModule } from '@angular/common/http';
import { ListProductComponent } from './examples/admin/list-product/list-product.component';
import { SidebarComponent } from './examples/admin/sidebar/sidebar.component';
import { ListCategoryComponent } from './examples/admin/list-category/list-category.component';
import { AddCategoryComponent } from './examples/admin/add-category/add-category.component';
import { AddProductComponent } from './examples/admin/add-product/add-product.component';
import { CommonModule } from '@angular/common';







@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListProductComponent,
    SidebarComponent,
    ListCategoryComponent,
    FooterComponent,
    AddProductComponent,
    AddCategoryComponent,
    


  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
        NgbModule,
        ReactiveFormsModule

  ],
  providers: [ProductService,CategoryProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
