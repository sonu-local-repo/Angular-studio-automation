import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { CreateEstimateComponent } from './create-estimate/create-estimate.component';
import { NgModule } from '@angular/core';
import { EstimateRoutingModule } from './estimate-routing.module';
import { EstimateListComponent } from './estimate-list/estimate-list.component';
@NgModule({
  declarations: [
    CreateEstimateComponent,
    EstimateListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EstimateRoutingModule
  ],
  exports: [
    CreateEstimateComponent,
    EstimateListComponent
  ]
})
export class EstimatingModule { }
