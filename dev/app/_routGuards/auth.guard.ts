import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CookieService } from "../_services/index";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private cookie:CookieService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.cookie.getCookie('username')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        // window.location.href = "./login.html";
        // window.location.href =  window.location.origin + window.location.pathname.replace("index.html","login.html");
        window.location.href =  window.location.origin + window.location.pathname + "login.html";
        return false;
    }
}