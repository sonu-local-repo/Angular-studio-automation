import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ApiService } from '@core/services/api.service';
import { Quote } from '@shared/models/quote.model';
@Injectable({
    providedIn: 'root'
})
export class QuoteService {
    constructor(
        private apiService: ApiService
    ) { }
    getQuote(id: number): Observable<HttpResponse<Quote>> {
        return this.apiService.get(`/omt/quote/${id}`, null);
    }
    getAllQuotes(): Observable<HttpResponse<Quote[]>> {
        return this.apiService.get(`/omt/quote/all`, null);
    }
    createQuote(quote: Quote): Observable<Quote> {
        return this.apiService.post('/omt/quote/create', quote);
    }
    getQuoteByOpporunityId(id: number) {
        return this.apiService.get(`/omt/quote/opportunity/${id}/all`, null);
    }
}
