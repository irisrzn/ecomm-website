import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductListingsComponent } from './product-listings/product-listings.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  imports: [
    BrowserModule, FormsModule, RouterModule, AppRoutingModule, HttpClientModule
  ],
  declarations: [
    AppComponent, ProductListingsComponent, ProductDetailComponent, NavbarComponent, ProductCardComponent, CartComponent, LoginComponent, SignupComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}