import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { UsersignupformComponent } from './components/usersignupform/usersignupform.component';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [{ path: '', component: LoginpageComponent },
{ path: 'signup', component: UsersignupformComponent },
{path: '**', pathMatch:'full', component:NotFoundComponent}]

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    UsersignupformComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
