import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SignInComponent} from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular-6-social-login';
import {OtreebaProductsServiceClient} from './services/otreeba-products.service.client';
import { CartViewComponent } from './cart-view/cart-view.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HeaderComponent } from './header/header.component';
import { RegisterProductsComponent } from './register-products/register-products.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import {UserServiceClient} from './services/user.service.client';
import { SearchBarCartComponent } from './search-bar-cart/search-bar-cart.component';
import {FormsModule} from '@angular/forms';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminSectionOrdersComponent } from './admin-section-orders/admin-section-orders.component';
import { AdminSectionProfileComponent } from './admin-section-profile/admin-section-profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserPersonalInfoComponent } from './user-personal-info/user-personal-info.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ProductViewerComponent } from './product-viewer/product-viewer.component';
import { InventoryServiceClient } from './services/inventory.service.client';
import { ProductServiceClient } from './services/product.service.client';
import {OrderServiceClient} from './services/order.service.client';
import {FilterPipe} from './filter.pipe';
import { RelatedUsersComponent } from './related-users/related-users.component';
import { RelatedUserDetailsComponent } from './related-user-details/related-user-details.component';

// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('138892709125-hdngjmc9640cfth2jq58rddtsu2nc1ei.apps.googleusercontent.com')
      }
    ]
);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    CartViewComponent,
    UserProfileComponent,
    ProductDetailsComponent,
    HeaderComponent,
    RegisterProductsComponent,
    ManageProductsComponent,
    EditProductComponent,
    SearchBarCartComponent,
    AdminPageComponent,
    AdminSectionOrdersComponent,
    AdminSectionProfileComponent,
    SignUpComponent,
    UserPersonalInfoComponent,
    OrderListComponent,
    ProductViewerComponent,
    FilterPipe,
    RelatedUsersComponent,
    RelatedUserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    FormsModule
  ],
  providers: [
    OtreebaProductsServiceClient,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    UserServiceClient,
    InventoryServiceClient,
    ProductServiceClient,
    OrderServiceClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
