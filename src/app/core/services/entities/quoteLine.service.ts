import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
    providedIn: 'root'
})

export class QuoteLineItemService {
    constructor(
        private apiService: ApiService
    ) {

    }

    createQuoteLineItem(body: any) {
        return this.apiService.post('/omt/quoteLine/create', body);
    }

    updateQuoteLineItem(id: number, body: any) {
        return this.apiService.put(`/omt/quoteLine/${id}`, body);
    }

    deleteQuoteLineItem(id: number) {
        return this.apiService.delete(`/omt/quoteLine/${id}`);
    }
}
