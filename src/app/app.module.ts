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
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [{path:'', component:HomepageComponent},{path: 'login', component: LoginpageComponent },
{ path: 'signup', component: UsersignupformComponent },
{path: '**', pathMatch:'full', component:NotFoundComponent}]

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    UsersignupformComponent,
    HeaderComponent,
    NotFoundComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
