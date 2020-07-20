import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AccountsListViewComponent } from './accounts-list-view/accounts-list-view.component';
import {AccountDetailsViewComponent} from './account-details-view/account-details-view.component';

const routes: Routes = [
    { path: '', component: AccountsListViewComponent },
    { path: 'details', component: AccountDetailsViewComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule {}
