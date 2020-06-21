import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EmployeeModule } from './employee/employee.module';
import { InnerRoutingModule } from './inner-routing.module';
import { InnerComponent } from './inner.component';
import { SomethingWentWrongComponent } from './something-went-wrong/something-went-wrong.component';
import { ComponentsModule } from '@shared/components/components.module';
import { CardsComponent } from './reports/cards/cards.component';
import { MessageModalComponent } from '@shared/components/message-modal/message-modal.component';
import { OrderEffectsComponent } from './order/order-effects/order-effects.component';
@NgModule({
  declarations: [
    InnerComponent,
    SomethingWentWrongComponent,
    CardsComponent,
    OrderEffectsComponent,
  ],
  exports: [InnerComponent, CardsComponent],
  imports: [
    CommonModule,
    InnerRoutingModule,
    SharedModule,
    DragDropModule,
    LayoutModule,
    EmployeeModule,
    ComponentsModule,
  ],
  entryComponents: [
    MessageModalComponent,
    OrderEffectsComponent
  ]
})
export class InnerModule { }
