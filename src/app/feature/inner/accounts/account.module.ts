import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './account-routing.module';
import { AccountsListViewComponent } from './accounts-list-view/accounts-list-view.component';
import { SharedModule } from '@shared/shared.module';
import { AccountDetailsViewComponent } from './account-details-view/account-details-view.component';
import { MaterialModule } from '@shared/modules/material.module';
import { CreateAccountModalComponent } from './create-account-modal/create-account-modal.component';
import { LookupAccountModalComponent } from './lookup-account-modal/lookup-account-modal.component';
@NgModule({
    declarations: [
        AccountsListViewComponent,
        AccountDetailsViewComponent,
        CreateAccountModalComponent,
        LookupAccountModalComponent
    ],
    imports: [
        CommonModule,
        FeatureRoutingModule,
        SharedModule,
        MaterialModule
    ],
    exports: [
        CreateAccountModalComponent,
        LookupAccountModalComponent
    ],
    entryComponents: [
        CreateAccountModalComponent,
        LookupAccountModalComponent
    ]
})
export class AccountModule { }
