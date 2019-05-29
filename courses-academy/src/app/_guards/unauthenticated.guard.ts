import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable()
export class UnauthenticatedCanActivate implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean {
        if(!this.authService.isAuthenticated()){
            return true;
        }

        this.router.navigateByUrl('/courses');
        return false;
    }
}