import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductListingsComponent } from './product-listings/product-listings.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { OrderHistoryComponent } from './order-history/order-history.component';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    AuthService
  ],
  imports: [
    BrowserModule, FormsModule, RouterModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  declarations: [
    AppComponent, ProductListingsComponent, ProductDetailComponent, NavbarComponent, ProductCardComponent, CartComponent, LoginComponent, RegisterComponent, CheckoutComponent, OrderHistoryComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}