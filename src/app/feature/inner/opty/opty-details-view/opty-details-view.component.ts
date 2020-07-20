import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { OptyService } from '@core/services/entities/opty.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Timeline } from '@shared/models/timeline.model';
import { of, forkJoin, Subscription } from 'rxjs';
import { Account } from '@shared/models/account.model';
import { Address } from '@shared/models/address.model';
import { QuoteService } from '@core/services/entities/quote.service';
import { Quote } from '@shared/models/quote.model';
import { JobLineItem } from '@shared/models/joblineitem.model';
import { Jobs } from '@shared/models/jobs.model';
import { Opportunity } from '@shared/models/opty.model';
@Component({
  selector: 'app-opty-details-view',
  templateUrl: './opty-details-view.component.html',
  styleUrls: ['./opty-details-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OptyDetailsViewComponent implements OnInit, AfterViewInit {
  public opty: Opportunity;
  account: Account;
  optyId = 0;
  quote: Quote;
  quoteId = 0;
  job = new Jobs();
  jobsObs: Observable<Jobs>;
  quoteObs: Observable<Quote>;
  timeline: Timeline[];
  optyObs: Observable<Opportunity>;
  optySubscription: Subscription;
  constructor(
    private optyService: OptyService,
    private activatedRoute: ActivatedRoute,
    private quoteService: QuoteService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.optyId = +this.activatedRoute.snapshot.paramMap.get('optyId');
    // this.timeline = this.getActivityTimeline();
    forkJoin(this.getOptyDetails(this.optyId))
      .pipe(
        map(([ // quote,
          opty]) => {
          return [
            
            //  quote.body,
            opty.body,
          ];
        })
      )
      .subscribe(result => {
        if (!result) {
          return;
        }
        this.opty = result[0] as Opportunity;
        this.quoteId = this.opty.quotes[0].id;
        this.quoteObs = of(this.opty.quotes[0]);
        Object.assign(this.job, this.opty.quotes[0]);
        this.job.jobLine = this.opty.quotes[0].quoteLine;
        this.jobsObs = of(this.job);
      });
  }

  getQuoteDetails(id) {
    return this.quoteService.getQuote(id);
  }
  getOptyDetails(id) {
    return this.optyService.getOpty(id);

    // .subscribe(data => {
    //   if (!data) {
    //     return;
    //   }
    //   this.address = this.getAddress(data.accounts);
    //   this.opty = data;
    //   console.log(this.contains(data.accounts, Account));
    //   this.account = this.contains(data.accounts, Account) ? data.accounts[0] : new Account();
    // });
  }

  getAddress(accounts: Account[]) {
    let address = new Address();
    if (this.contains(accounts, Account)) {
      if (this.contains(accounts[0].addresses, Address)) {
        address = accounts[0].addresses[0];
      }
    }
    return address;
  }

  contains(arr, obj) {
    let i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;
  }
}
