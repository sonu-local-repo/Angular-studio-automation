import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Opportunity } from '@shared/models/opty.model';
import { Quote } from '@angular/compiler';
import { Jobs } from '@shared/models/jobs.model';
import { Observable, Subscription, forkJoin, of } from 'rxjs';
import { Timeline } from '@swimlane/ngx-charts';
import { OptyService } from '@core/services/entities/opty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteService } from '@core/services/entities/quote.service';
import { map } from 'rxjs/operators';
import { Address } from '@shared/models/address.model';
import { Account } from '@shared/models/account.model';
import { DataTransferService } from '@shared/services/dataTransferService.service';
import { MatTabGroup } from '@angular/material';

@Component({
  selector: 'app-opty-details-tab',
  templateUrl: './opty-details-tab.component.html',
  styleUrls: ['./opty-details-tab.component.scss']
})

export class OptyDetailsTabComponent implements OnInit, AfterViewInit {
  // @ViewChild(MatTabGroup, null) tabGroup: MatTabGroup;

  public opty: Opportunity;
  account: Account;
  optyId = 0;
  quote: Quote;
  job = new Jobs();
  jobsObs: Observable<Jobs>;
  quoteObs: Observable<Quote>;
  timeline: Timeline[];
  optyObs: Observable<Opportunity>;
  optySubscription: Subscription;
  constructor(
    private optyService: OptyService,
    private activatedRoute: ActivatedRoute,
    private quoteService: QuoteService,
    private router: Router,
    private dataService: DataTransferService
  ) {
    this.optyId = +this.activatedRoute.snapshot.paramMap.get('optyId');
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
        // this.timeline = result[0] as Timeline[];
        this.opty = result[0] as Opportunity;
        // this.quoteObs = of(this.opty.quotes[0]);
        // Object.assign(this.job, this.opty.quotes[0]);
        // this.job.jobLine = this.opty.quotes[0].quoteLine;
        // this.jobsObs = of(this.job);
        this.dataService.send({ opty: this.opty });
      });

  }

  ngOnInit() {
    this.optyId = +this.activatedRoute.snapshot.paramMap.get('optyId');
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
        // this.timeline = result[0] as Timeline[];
        this.opty = result[0] as Opportunity;
        // this.quoteObs = of(this.opty.quotes[0]);
        // Object.assign(this.job, this.opty.quotes[0]);
        // this.job.jobLine = this.opty.quotes[0].quoteLine;
        // this.jobsObs = of(this.job);

        // this.dataService.getData.subscribe(x => {
        //   this.dataService.send({ opty: this.opty, timeline: x.timeline });
        // });
        this.dataService.send({ opty: this.opty });
        // this.router.navigate([`/opportunity/${this.optyId}/quotes`], { skipLocationChange: true });
      });

  }

  ngAfterViewInit() {

  }

  getQuoteDetails(id) {
    return this.quoteService.getQuote(id);
  }
  getOptyDetails(id) {
    return this.optyService.getOpty(id);
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

  tabMenuChange($event) {
    console.log($event.tab.textLabel)
    this.menuOnClick($event.tab.textLabel)
  }
  menuOnClick(menu: string) {
    this.activatedRoute.params.subscribe(data => {
      switch (menu) {
        // case 'Details':
        //   this.router.navigate(['/opportunity/' + data.optyId], { skipLocationChange: true });
        //   break;
        // case 'Quote':
        //   this.router.navigate([`/opportunity/${data.optyId}/quotes`], { skipLocationChange: true });
        //   break;
        // case 'Jobs':
        //   this.router.navigate([`/opportunity/${data.optyId}/jobs`], { skipLocationChange: true });
        //   break;
        // case 'Schedule':
        //   this.router.navigate([`/opportunity/${data.optyId}/schedule`], { skipLocationChange: true });
        //   break;
        // case 'Activity':
        //   this.router.navigate([`/opportunity/${data.optyId}/activity`], { skipLocationChange: true });
        //   break;
        // case 'Estimate':
        //   this.router.navigate([`/opportunity/${data.optyId}/estimate`], { skipLocationChange: true });
        //   break;
        // case 'Invoice':
        //   this.router.navigate([`/opportunity/${data.optyId}/invoice`], { skipLocationChange: true });
        //   break;
        case 'Jobs':
          this.router.navigate([`/opportunity/${data.optyId}/jobs`], { skipLocationChange: true });
          break;
        default:
          break;
      }

    });
  }
}
