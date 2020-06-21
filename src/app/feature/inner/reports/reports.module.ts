import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CardsComponent } from './cards/cards.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
@NgModule({
    declarations: [
        CardsComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})

export class ReportsModule { }
