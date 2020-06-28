import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsListComponent } from './settings-list/settings-list.component';
import { ServicesComponent } from './services/services.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServicesDialogComponent } from './services-dialog/services-dialog.component';
import { CreateLovModelComponent } from './create-lov-model/create-lov-model.component';
import { ResponsibilitiesComponent } from './responsibility-list/responsibilities.component';
import { ResponsibilityProfileComponent } from './responsibility-profile/responsibility-profile.component';
import { ResponsibilityViewComponent } from './responsibility-view/responsibility-view.component';
import { ViewsComponent } from './views-list/views.component';
import { ViewAddComponent } from './view-add/view-add.component';

@NgModule({
  declarations: [SettingsListComponent,
    ServicesComponent, ServiceDetailsComponent, ServicesDialogComponent,
    CreateLovModelComponent, ResponsibilitiesComponent, ResponsibilityProfileComponent, ResponsibilityViewComponent, ViewsComponent, ViewAddComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ],
  entryComponents: [
    ServicesDialogComponent,
    CreateLovModelComponent,
    ViewAddComponent,
    ViewsComponent
  ],
  exports:[
    ResponsibilitiesComponent
  ]
})
export class SettingsModule { }
