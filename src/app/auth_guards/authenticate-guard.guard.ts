import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { selectCustomer } from '../customer-state-store/customer.selector';
import { Customer } from '../EntityModels/Customer';
import { AuthServiceService } from '../services_folder/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuardGuard implements CanActivate {
  constructor (private router:Router, private authService:AuthServiceService){
    
  }
  customer:Customer=new Customer;
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isLoggedIn().pipe(
      tap(isLoggedIn=>{
        if(!isLoggedIn){
          this.router.navigate(['/login'])
        }
      })
    )
  }
  
}
