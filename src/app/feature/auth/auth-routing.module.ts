import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';
import {PasswordResetComponent} from '@shared/components/password-reset/password-reset.component'
import { PasswordResetRedirectComponent } from '@shared/components/password-reset-redirect/password-reset-redirect.component';
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: AuthComponent,
                children: [
                    {
                        path: 'login',
                        component: LoginComponent,
                    },
                    {
                        path: 'forgot',
                        component: PasswordResetComponent
                    },
                    {
                        path: 'reset',
                        component: PasswordResetRedirectComponent
                    },
                    {
                        path: '**',
                        redirectTo: 'login'
                    },
                ]
            },
        ])
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
