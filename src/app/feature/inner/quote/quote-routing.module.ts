import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { QuoteListComponent } from './quote-list/quote-list.component';
import { CreateQuoteLineModalComponent } from './create-quote-line-modal/create-quote-line-modal.component';

const routes: Routes = [
    { path: '', component: QuoteListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    entryComponents: [CreateQuoteLineModalComponent]
})
export class QuoteRoutingModule { }
