import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateEstimateComponent } from './create-estimate/create-estimate.component';

const routes: Routes = [
    { path: '', component: CreateEstimateComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EstimateRoutingModule {}
