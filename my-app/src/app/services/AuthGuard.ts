import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        var user = localStorage.getItem("userName");
        
        if(user!=undefined && user.length>0) {
            return true;
        }
        
        
        this.router.navigate(['users/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}