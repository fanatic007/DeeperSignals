import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, DefaultUrlSerializer, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let role = JSON.parse(localStorage.getItem('userDetails'))['role'];console.log(role);
    
    if(role){
      return role.toLowerCase() === 'admin';
    }
    else{
      return false;
    }
  }
}
