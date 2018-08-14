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
import { ProducerProfileComponent } from './producer-profile/producer-profile.component';
import {ProducerProductsServiceClient} from './services/producer-products.service.client';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HeaderComponent } from './header/header.component';
import { RegisterProductsComponent } from './register-products/register-products.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';

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
    ProducerProfileComponent,
    ProductDetailsComponent,
    HeaderComponent,
    RegisterProductsComponent,
    ManageProductsComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule
  ],
  providers: [
    OtreebaProductsServiceClient,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    ProducerProductsServiceClient,
    SignInComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
