import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { ListCategoryComponent } from './admin/list-category/list-category.component';
import { ProductsComponent } from './shop/products/products.component';

import { CategoryProductComponent } from './shop/category-product/category-product.component';
import { ProductbycatComponent } from './shop/productbycat/productbycat.component';
import { SingleProductComponent } from './shop/single-product/single-product.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { UpdateOrderComponent } from './admin/update-order/update-order.component';
import { ProductService } from 'app/services/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { CategoryProductService } from 'app/services/category-product.service';
import { UpdateProductComponent } from './admin/update-product/update-product.component';
import { HeaderComponent } from './shop/header/header.component';
import { FooterComponent } from './shop/footer/footer.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { LoginComponent } from './login/login.component';
import { UpdateuserComponent } from './admin/updateuser/updateuser.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NgxPaginationModule,
        ReactiveFormsModule

    
        
        

    ],
    providers: [ProductService,CategoryProductService],
    declarations: [
        LandingComponent,
        SignupComponent,
        ProfileComponent,
       
        ProductsComponent,
        CategoryProductComponent,
        ProductbycatComponent,
        SingleProductComponent,
        DashboardComponent,
        OrdersComponent,
        UpdateOrderComponent,
        UpdateProductComponent,
        FooterComponent,
        AddUserComponent,
        ListUserComponent,
        UpdateuserComponent,

        
    ]
})
export class ExamplesModule { }
