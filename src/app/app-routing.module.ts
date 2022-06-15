import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateGuardGuard } from './auth_guards/authenticate-guard.guard';
import { CartComponent } from './components/cart/cart.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SpecificproductComponent } from './components/specificproduct/specificproduct.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { UsersignupformComponent } from './components/usersignupform/usersignupform.component';

const routes: Routes = [{ path: '', redirectTo: 'login', pathMatch: 'full' },
 { path: 'home', component: HomepageComponent,
canActivate:[AuthenticateGuardGuard] },
  { path: 'login', component: LoginpageComponent},
{ path: 'signup', component: UsersignupformComponent },
{path:'products',component:CategoryProductsComponent,
canActivate:[AuthenticateGuardGuard]},
{path:'specificproduct',component:SpecificproductComponent,
canActivate:[AuthenticateGuardGuard]},
{path:'cart',component:CartComponent,
canActivate:[AuthenticateGuardGuard]},
{path:'user-profile',component:UserprofileComponent,
canActivate:[AuthenticateGuardGuard]},
{ path: '**', pathMatch: 'full', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
