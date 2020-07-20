import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MaterialModule } from '../modules/material.module';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FloatingAddButtonComponent } from './floating-add-button/floating-add-button.component';
import { LabelTextComboComponent } from './label-text-combo/label-text-combo.component';
import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { PageScrollLayoutComponent } from './layout/page-scroll-layout/page-scroll-layout.component';
import { SidenavListComponent } from './layout/sidenav-list/sidenav-list.component';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { NoDataMessageComponent } from './no-data-message/no-data-message.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetRedirectComponent } from './password-reset-redirect/password-reset-redirect.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FakeBackendProvider } from 'app/fake-backend/fake-backend.interceptor';
import { ChooseItemModalComponent } from './choose-item-modal/choose-item-modal.component';
import { ComposeEmailComponent } from './compose-email/compose-email.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    SidenavListComponent,
    BreadcrumbComponent,
    LabelTextComboComponent,
    ConfirmModalComponent,
    MessageModalComponent,
    FloatingAddButtonComponent,
    PageScrollLayoutComponent,
    NoDataMessageComponent,
    PageNotFoundComponent,
    ToolbarComponent,
    PasswordResetComponent,
    PasswordResetRedirectComponent,
    ChooseItemModalComponent,
    ComposeEmailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  exports: [
    SidenavListComponent,
    BreadcrumbComponent,
    LabelTextComboComponent,
    ConfirmModalComponent,
    FloatingAddButtonComponent,
    PageScrollLayoutComponent,
    NoDataMessageComponent,
    PageNotFoundComponent,
    ToolbarComponent,
    PasswordResetComponent
  ],
  entryComponents: [
    ConfirmModalComponent
  ],
})
export class ComponentsModule { }
