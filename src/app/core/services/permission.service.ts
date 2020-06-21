import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  allowAll = true;

  constructor(
    private authService: AuthService
  ) { }

  getUserScreenPermissions(screenId: string) {
    const userScreens = this.authService.getLoggedInUser().views;
    const currentScreen = userScreens.find((view) => {
      return view.name.toLowerCase() === (screenId ? screenId.toLowerCase() : '');
    });
    return currentScreen;
  }

  canView(screenId: string): boolean {
    const permission = this.getUserScreenPermissions(screenId);
    return this.allowAll ? true : permission && permission.viewInt;
  }

  canEdit(screenId: string): boolean {
    const permission = this.getUserScreenPermissions(screenId);
    return this.allowAll ? true : permission && permission.editInt;
  }

  canDelete(screenId: string): boolean {
    const permission = this.getUserScreenPermissions(screenId);
    return this.allowAll ? true : permission && permission.deleteInt;
  }
}
