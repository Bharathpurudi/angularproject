import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { UsersignupformComponent } from './components/usersignupform/usersignupform.component';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { ComponentStore } from '@ngrx/component-store';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { CartComponent } from './components/cart/cart.component';
import { StoreserviceService } from './services_folder/storeservice.service';
import { ProductServiceService } from './services_folder/product-service.service';
import { SpecificproductComponent } from './components/specificproduct/specificproduct.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer, metaReducerLocalStorage } from './cart-state-store/cart.reducer';



@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    UsersignupformComponent,
    HeaderComponent,
    NotFoundComponent,
    HomepageComponent,
    UserprofileComponent,
    CategoryProductsComponent,
    CartComponent,
    SpecificproductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({cartEntries:cartReducer}, {metaReducers:[metaReducerLocalStorage]}),
  ],
  providers: [DatePipe, ComponentStore,StoreserviceService,ProductServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
