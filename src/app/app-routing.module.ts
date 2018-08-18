import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import {CartViewComponent} from './cart-view/cart-view.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {RegisterProductsComponent} from './register-products/register-products.component';
import {ManageProductsComponent} from './manage-products/manage-products.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {OrderListComponent} from './order-list/order-list.component';
import { ProductViewerComponent } from './product-viewer/product-viewer.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: SignInComponent },
      { path: 'register', component: SignUpComponent },
      { path: 'cart', component: CartViewComponent },
      { path: 'home', component: HomeComponent},
      { path: 'user/:userId/:order', component: OrderListComponent},
      { path: 'cart/:userId', component: CartViewComponent },
      { path: 'profile/:userId', component: UserProfileComponent},
      { path: 'product/:productId', component: ProductDetailsComponent},
      { path: 'add-products', component: RegisterProductsComponent},
      { path: 'manage-products', component: ManageProductsComponent},
      { path: 'edit-product', component: EditProductComponent},
      { path: 'product/:productId', component: ProductViewerComponent },
      { path: '**', component: HomeComponent} // last
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
