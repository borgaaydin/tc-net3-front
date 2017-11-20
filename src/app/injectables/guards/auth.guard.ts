import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import decode from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const expectedRole = route.data.expectedRole;
        const token = localStorage.getItem('currentUser');
        const tokenPayload = decode(token);
        if (token) {
            if (tokenPayload.scope === 'ens') {
              // logged in as teacher

            }
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
