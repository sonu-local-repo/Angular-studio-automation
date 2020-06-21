import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { OrderAddEditComponent } from 'app/feature/inner/order/order-add-edit/order-add-edit.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService {

  constructor() { }

  canDeactivate(
    component: OrderAddEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const deactivateAllowed = confirm('Are you sure to leave this page?');
    // if (deactivateAllowed) {
    //   return true;
    // } else {
    //   history.pushState({}, '', currentState.url);
    //   return false;
    // }
    return false;
  }
}
