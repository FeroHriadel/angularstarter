import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";



@Injectable()



export class GuestOnlyGuardService implements CanActivate {

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
        if (token) {
            this.router.navigate(['/']);
            return false
        }

        return true
    }
}
