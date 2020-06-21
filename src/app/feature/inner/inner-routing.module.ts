import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InnerComponent } from './inner.component';
import { NavigationGuard } from '@core/services/navigation-guard.service';
import { CardsComponent } from './reports/cards/cards.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: InnerComponent,
                children: [
                    {
                        path: '',
                        component: CardsComponent,
                        data: { breadcrumb: 'Dashboard' }
                    },
                    {
                        path: 'employees',
                        loadChildren: './employee/employee.module#EmployeeModule',
                        data: { breadcrumb: 'Employees' },
                        canActivate: [NavigationGuard],
                    },
                    {
                        path: 'customers',
                        loadChildren: './customer/customer.module#CustomerModule',
                        data: { breadcrumb: 'Customers' },
                        canActivate: [NavigationGuard],
                    },
                    {
                        path: 'orders',
                        loadChildren: './order/order.module#OrderModule',
                        data: { breadcrumb: 'Orders' },
                        canActivate: [NavigationGuard],
                    },
                    {
                        path: 'pipeline',
                        loadChildren: './pipeline/pipeline.module#PipelineModule',
                        data: { breadcrumb: 'Pipeline' },
                        canActivate: [NavigationGuard],
                    },
                    {
                        path: 'tasks',
                        loadChildren: './tasks/tasks.module#TasksModule',
                        data: { breadcrumb: 'All Tasks' },
                        canActivate: [NavigationGuard],
                    },
                    {
                        path: 'settings',
                        loadChildren: './settings/settings.module#SettingsModule',
                        data: { breadcrumb: 'Settings' },
                        canActivate: [NavigationGuard],
                    },
                ]
            },
            {
                path: '**',
                redirectTo: 'auth/login'
            },
            {
                path: 'tasks',
                loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
            },
        ])
    ],
    exports: [RouterModule]
})
export class InnerRoutingModule { }
