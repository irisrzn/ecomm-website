import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { BrowserModule } from '@angular/platform-browser';
import { BaseChartDirective } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    OrdersComponent,
    ProductsComponent,
    UsersComponent,
    AdminNavbarComponent
  ],
  exports: [AdminComponent, AdminNavbarComponent, ProductsComponent], 
  imports: [
    SharedModule,
    BaseChartDirective,
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    BrowserModule,
    FormsModule, RouterModule, ReactiveFormsModule, NgxMaskDirective], providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AdminModule { }
