import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";



@Injectable()



export class AdminGuardService implements CanActivate {

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1])) //decodes the middle section of jwt (with .id and .isAdmin)           
            if (tokenDecode.isAdmin === 'true' || tokenDecode.isAdmin === true) return true
        }

        this.router.navigate(['/']); //redirect elsewhere
        return false //false = cannot navigate further
    }
}
