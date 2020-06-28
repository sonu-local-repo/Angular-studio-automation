import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  allowAll = false;

  constructor(
    private authService: AuthService
  ) { }

  getUserScreenPermissions(screenId: string) {
    const userScreens = this.authService.getLoggedInUser().viewsList;
    console.log(userScreens);
    console.log(screenId);
    const currentScreen = userScreens.find((view) => {
      return view.viewName.toLowerCase() === (screenId ? screenId.toLowerCase() : '');
    });
    return currentScreen;
  }

  canView(screenId: string): boolean {
    const permission = this.getUserScreenPermissions(screenId);
    return this.allowAll ? true : permission && permission.readInt;
  }
  canViewOf(screenId: string): Observable<boolean> {
    const permission = this.getUserScreenPermissions(screenId);
    return of(this.allowAll ? true : permission && permission.readInt);
  }
  canEdit(screenId: string): boolean {
    const permission = this.getUserScreenPermissions(screenId);
    return this.allowAll ? true : permission && permission.updateInt;
  }
  canEditOf(screenId: string): Observable<boolean> {
    const permission = this.getUserScreenPermissions(screenId);
    return of(this.allowAll ? true : permission && permission.updateInt);
  }


  canDelete(screenId: string): boolean {
    const permission = this.getUserScreenPermissions(screenId);
    return this.allowAll ? true : permission && permission.deleteInt;
  }
  canDeleteOf(screenId: string): Observable<boolean> {
    const permission = this.getUserScreenPermissions(screenId);
    return of(this.allowAll ? true : permission && permission.deleteInt);
  }
  canCreateOf(screenId: string): Observable<boolean> {
    const permission = this.getUserScreenPermissions(screenId);
    return of(this.allowAll ? true : permission && permission.createInt);
  }
}
