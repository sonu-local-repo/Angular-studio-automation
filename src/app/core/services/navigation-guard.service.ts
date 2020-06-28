import { Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { EmployeeAuthorities } from 'app/feature/inner/employee/models/employee-authorities.model';

@Inject({
    providedIn: 'root'
})

export class NavigationGuard implements CanActivate {
    constructor(
        private authService: AuthService
    ) { }

    resp = ['Admin', 'Employees', 'Owner', 'Billing'];
    viewResp = {
        Admin: [
            {
                Route: 'Employees',
                CanView: true,
                CanEdit: true,
                CanDelete: true
            },
            {
                Route: 'Orders',
                CanView: true,
                CanEdit: true,
                CanDelete: true
            },
            {
                Route: 'Customers',
                CanView: true,
                CanEdit: true,
                CanDelete: true
            },
            {
                Route: 'Pipeline',
                CanView: true,
                CanEdit: true,
                CanDelete: true
            },
            {
                Route: 'Settings',
                CanView: true,
                CanEdit: true,
                CanDelete: true
            },
            {
                Route: 'Tasks',
                CanView: true,
                CanEdit: true,
                CanDelete: true
            },
            {
                Route: 'Tasks/mytask',
                CanView: true,
                CanEdit: true,
                CanDelete: true
            }],
        Employees: [{
            Route: 'Orders',
            CanView: true,
            CanEdit: true,
            CanDelete: true
        },
        {
            Route: 'Tasks',
            CanView: true,
            CanEdit: true,
            CanDelete: true
        },
        {
            Route: 'Tasks/mytask',
            CanView: true,
            CanEdit: true,
            CanDelete: true
        }]
    };

    canActivate(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot): Observable<boolean> {
        // this.authService.employeeAuthorities$.subscribe((data: EmployeeAuthorities) => {
        //     console.log(data);
        // });

      this.authService.getEmployeeAuthorities().subscribe(data => {
        // console.log(data.views-list);
      })

        return this.canShowMenu(route.routeConfig.path);
    }

    public canShowMenu(route: string) {
        const employeeResp = 'Admin';
        let routeFound = true;
        if (this.resp.indexOf(employeeResp) > -1) {
            if (this.viewResp[employeeResp]) {
                for (const element of this.viewResp[employeeResp]) {
                    if (element.Route === route.charAt(0).toUpperCase() + route.substr(1).toLowerCase()) {
                        routeFound = element.CanView;
                        break;
                    }
                }
            }
        }
        return of(routeFound);
      // return of(false);
    }
}
