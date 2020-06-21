import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PipelineListComponent } from './pipeline-list/pipeline-list.component';
import { PipelineRoutingModule } from './pipeline-routing.module';
import { PipelineListTableViewComponent } from './pipeline-list-table-view/pipeline-list-table-view.component';

@NgModule({
  declarations: [PipelineListComponent, PipelineListTableViewComponent],
  imports: [
    CommonModule,
    PipelineRoutingModule,
    SharedModule,
  ]
})
export class PipelineModule { }
