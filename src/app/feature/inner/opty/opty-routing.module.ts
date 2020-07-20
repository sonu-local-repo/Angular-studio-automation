import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OptyListViewComponent } from './opty-list-view/opty-list-view.component';
import { CreateOptyDialogComponent } from './create-opty-dialog/create-opty-dialog.component';
import { OptyDetailsViewComponent } from './opty-details-view/opty-details-view.component';
import { OptyDetailsTabComponent } from './opty-details-tab/opty-details-tab.component';
import { ComposeEmailComponent } from '@shared/components/compose-email/compose-email.component';
const routes: Routes = [
    {
        path: '',
        component: OptyListViewComponent
    },
    {
        path: 'all',
        component: OptyDetailsViewComponent
    },
    {
        path: ':optyId',
        loadChildren: () => import('./opty-details-tab/opty-details-tab.module').then(m => m.OptyDetailsTabsModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    entryComponents: [CreateOptyDialogComponent, ComposeEmailComponent]
})
export class OptyRoutingModule { }
