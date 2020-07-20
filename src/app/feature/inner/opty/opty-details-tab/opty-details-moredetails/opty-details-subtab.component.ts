import { Component, OnInit, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Opportunity } from '@shared/models/opty.model';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataTransferService } from '@shared/services/dataTransferService.service';
import { Quote } from '@shared/models/quote.model';

@Component({
  selector: 'app-opty-details-subtab',
  templateUrl: './opty-details-subtab.component.html',
  styleUrls: ['./opty-details-subtab.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: { style: 'width: 100%' }
})
export class OptyDetailsSubtabComponent implements OnInit, AfterViewChecked {

  opty: Opportunity;
  quoteId = 0;
  constructor(
    private cdRef: ChangeDetectorRef,
    private dataService: DataTransferService
  ) {

  }

  ngOnInit() {
    //this.ngAfterViewChecked();
  }

  ngAfterViewChecked() {
    this.dataService.getData.subscribe(ip => {
      this.opty = ip.opty;
      if (this.opty) {
        if (this.opty.quotes && this.opty.quotes.length > 0) {
          this.quoteId = this.opty.quotes[0].id;
          console.log("Quote Id @ opty " + this.quoteId)
        }
      }
    });
  }

}
