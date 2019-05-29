import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';
import { Role } from '../Enums/role.enum';

@Injectable()
export class AdminCanActivate implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean {
        if(this.authService.isInRole(Role.Admin)){
            return true;
        }

        this.router.navigateByUrl('/courses');
        return false;
    }
}