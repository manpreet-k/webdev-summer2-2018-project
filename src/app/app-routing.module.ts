import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import {CartViewComponent} from './cart-view/cart-view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'signin', component: SignInComponent },
      { path: 'cart', component: CartViewComponent },
      { path: 'home', component: HomeComponent},
      { path: 'cart/:userId', component: CartViewComponent },
      { path: 'home/:userId', component: HomeComponent},
      { path: '**', component: HomeComponent} // last
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
