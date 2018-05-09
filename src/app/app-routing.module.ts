import { LoginComponent } from './components/general/login/login.component';
import { ShoppingCartComponent } from './components/general/shopping-cart/shopping-cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/general/home/home.component';
import { ProductsComponent } from './components/general/products/products.component';
import { CheckOutComponent } from './components/general/check-out/check-out.component';
import { OrderSuccessComponent } from './components/general/order-success/order-success.component';
import { MyOrdersComponent } from './components/user/my-orders/my-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'login', component: LoginComponent },
  { path: 'my/orders', component: MyOrdersComponent },
  { path: 'admin/products', component: AdminProductsComponent },
  { path: 'admin/orders', component: AdminOrdersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
