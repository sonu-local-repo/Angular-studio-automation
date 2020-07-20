import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTransferService } from '@shared/services/dataTransferService.service';
import { Opportunity } from '@shared/models/opty.model';
import { Observable, of } from 'rxjs';
import { Quote } from '@shared/models/quote.model';
import { EventEmitter } from 'protractor';
import { QuoteService } from '@core/services/entities/quote.service';
import { map } from 'rxjs/operators';
import { QuoteLineItem } from '@shared/models/quotelineitem.model';

@Component({
  selector: 'app-opty-details-quote',
  templateUrl: './opty-details-quote.component.html',
  styleUrls: ['./opty-details-quote.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: { style: 'width:100%' }
})
export class OptyDetailsQuoteComponent implements OnInit {
  opty: Opportunity;
  optyId = '';
  quoteId: number;
  quoteLines: QuoteLineItem[]
  constructor(
    private activatedRoute: ActivatedRoute,
    private quoteService: QuoteService,
  ) {

  }
  ngOnInit() {
    this.getQuotes();
  }

  getQuotes() {
    this.activatedRoute.paramMap.subscribe(data => {
      this.optyId = data.get('optyId');
      this.quoteService.getQuoteByOpporunityId(parseInt(this.optyId, 10)).pipe(map((resp) => resp.body)).subscribe(response => {
        this.quoteId = response.Id;
        this.quoteLines = response[0].quoteLine;
      });
    });
  }
  newQuoteLineCreated() {
    this.getQuotes();
  }
}
