import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { SignupComponent } from './examples/signup/signup.component';
import { LandingComponent } from './examples/landing/landing.component';
import { ListCategoryComponent } from './examples/admin/list-category/list-category.component';
//import { ListProductComponent } from './examples/admin/list-product/list-product.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { ListProductComponent } from './examples/admin/list-product/list-product.component';
import { ProductsComponent } from './examples/shop/products/products.component';
import { ProductbycatComponent } from './examples/shop/productbycat/productbycat.component';
import { DashboardComponent } from './examples/admin/dashboard/dashboard.component';
import { OrdersComponent } from './examples/admin/orders/orders.component';
import { UpdateOrderComponent } from './examples/admin/update-order/update-order.component';
import { NgbdModalContent } from './components/modal/modal.component';
import { AddCategoryComponent } from './examples/admin/add-category/add-category.component';
import { AddProductComponent } from './examples/admin/add-product/add-product.component';
import { UpdateProductComponent } from './examples/admin/update-product/update-product.component';
import { CartComponent } from './examples/shop/cart/cart.component';
import { SingleProductComponent } from './examples/shop/single-product/single-product.component';
import { CheckoutComponent } from './examples/checkout/checkout.component';
import { AddUserComponent } from './examples/admin/add-user/add-user.component';
import { AuthGuard } from './utils/auth-guard';
import { ListUserComponent } from './examples/admin/list-user/list-user.component';
import { LoginComponent } from './examples/login/login.component';
import { UpdateuserComponent } from './examples/admin/updateuser/updateuser.component';


const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent },
    { path: 'signup',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    {path: 'listProduct', component: ListProductComponent,canActivate:[AuthGuard],data:{permittedRole:"Provider"} },
    {path: 'listCategory', component: ListCategoryComponent,canActivate:[AuthGuard],data:{permittedRole:"Provider"}},
    {path: 'products', component: ProductsComponent ,canActivate:[AuthGuard],data:{permittedRole:"User"}},
    {path: 'listProduct/:id', component: ProductbycatComponent,canActivate:[AuthGuard],data:{permittedRole:"Provider"} },
    {path: 'shop', component: ProductsComponent },
    {path: 'singleProd', component: SingleProductComponent },
    {path: 'dashboard', component: DashboardComponent },
    {path: 'orders', component: OrdersComponent },
    {path: 'updateorders', component: UpdateOrderComponent },
    {path: 'cart', component: CartComponent ,canActivate:[AuthGuard],data:{permittedRole:"User"}},
    {path: 'modal', component: NgbdModalContent },
    {path: 'addCategory', component: AddCategoryComponent,canActivate:[AuthGuard],data:{permittedRole:"Provider"}},
    {path: 'addProduct', component: AddProductComponent,canActivate:[AuthGuard],data:{permittedRole:"Provider"}},
    {path: 'checkout', component: CheckoutComponent, canActivate:[AuthGuard],data:{permittedRole:"User"}},
    {path:'adduser',component:AddUserComponent,canActivate:[AuthGuard],data:{permittedRole:"Provider"}},
    {path:'listuser',component:ListUserComponent,canActivate:[AuthGuard],data:{permittedRole:"Provider"}},
    {path:'login',component:LoginComponent}, 
    { path:'profile', canActivate:[AuthGuard], component: ProfileComponent },
    { path:'updateuser/:id',     component: UpdateuserComponent },








];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
