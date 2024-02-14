import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {

  roleName !: string;

  constructor(private router: Router, private authService: AuthServiceService, private toastr: ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.roleName = this.authService.user.value?.user.roleName;

    if (this.roleName === "Admin") {
      return true;
    }

    this.toastr.error("Sorry! You don't have permission for this page.", "Access denied")
    return false;

  }

}
