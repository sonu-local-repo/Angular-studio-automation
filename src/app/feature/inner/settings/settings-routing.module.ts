import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingsListComponent } from './settings-list/settings-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: SettingsListComponent,
                data: { breadcrumb: 'All' }
            },
        ])
    ],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
