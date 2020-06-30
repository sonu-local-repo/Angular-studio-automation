import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingsListComponent } from './settings-list/settings-list.component';
import {ResponsibilitiesComponent} from "./responsibility-list/responsibilities.component";
import {CustomerProfileComponent} from "../customer/customer-profile/customer-profile.component";
import {ScreenName} from "@shared/enums/screen-name.enum";
import {ResponsibilityProfileComponent} from "./responsibility-profile/responsibility-profile.component";
import {WebAccess} from "@shared/enums/web-access.enum";
import {ServiceListComponent} from "./service-list/service-list.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: SettingsListComponent,
                data: { breadcrumb: 'All',
                  screenId: ScreenName.Settings,
                  permissionsRequired: [WebAccess.View] },

            },
          {
            path: 'responsibility',
            component: ResponsibilitiesComponent,
            data: { breadcrumb: 'Resp' },
            children: [
              {
                path: ':id',
                component: ResponsibilityProfileComponent,
                data: {
                  breadcrumb: ':id',
                  screenId: ScreenName.Responsibility_Profile,
                  // permissionsRequired: [WebAccess.View]
                }
              }
            ]
          },
          {
            path: ':id',
            component: ResponsibilityProfileComponent,
            data: {
              breadcrumb: ':id',
              screenId: ScreenName.Responsibility_Profile,
              // permissionsRequired: [WebAccess.View]
            }
          },
          {
            path: 'services',
            component: ServiceListComponent,
            data: {
              breadcrumb: ':id',
              // screenId: ScreenName.Responsibility_Profile,
              // permissionsRequired: [WebAccess.View]
            }
          }


        ])
    ],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
