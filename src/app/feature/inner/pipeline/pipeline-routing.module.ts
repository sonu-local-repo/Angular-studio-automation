import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PipelineListComponent } from './pipeline-list/pipeline-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: PipelineListComponent,
                data: { breadcrumb: 'All' }
            },
        ])
    ],
    exports: [RouterModule]
})
export class PipelineRoutingModule { }
