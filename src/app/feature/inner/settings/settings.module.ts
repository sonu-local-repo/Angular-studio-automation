import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsListComponent } from './settings-list/settings-list.component';
import { ServicesComponent } from './services/services.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServicesDialogComponent } from './services-dialog/services-dialog.component';
import { CreateLovModelComponent } from './create-lov-model/create-lov-model.component';

@NgModule({
  declarations: [SettingsListComponent, ServicesComponent, ServiceDetailsComponent, ServicesDialogComponent, CreateLovModelComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ],
  entryComponents: [
    ServicesDialogComponent,
    CreateLovModelComponent
  ]
})
export class SettingsModule { }
