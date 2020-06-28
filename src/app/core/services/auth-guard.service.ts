import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router,
    private permissionService: PermissionService
  ) { }

  private checkGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log("Is Logged In" +this.authService.isLoggedIn());
    if (!this.authService.isLoggedIn()) {
      return this.authService.getEmployeePermissions().pipe(
        map(userInfo => {
          return this.authService.isLoggedIn();
        }),
        catchError((err) => {
          this.router.navigateByUrl(`auth/login`);
          return of(false);
        })
      );

      /*return this.authService.getEmployeeAuthorities().pipe(
        map(userInfo => {
          return this.authService.isLoggedIn();
        }),
        catchError((err) => {
          this.router.navigateByUrl(`auth/login`);
          return of(false);
        })
      );*/
    } else {
      const permissionsRequired = route.data.permissionsRequired;
      console.log("Permission Required => " + permissionsRequired);
      const getUserScreenPermissions = this.permissionService.getUserScreenPermissions(route.data.screenId);
      let authorised = true;
      if (permissionsRequired) {
        permissionsRequired.map((permission) => {

          authorised = authorised && getUserScreenPermissions && getUserScreenPermissions[permission];
          console.log("authorised");
        });
      }

      if (!authorised) {
        this.router.navigate(['/']);
        return of(false);
      } else {
        return of(true);
      }
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkGuard(route, state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkGuard(route, state);
  }
}
