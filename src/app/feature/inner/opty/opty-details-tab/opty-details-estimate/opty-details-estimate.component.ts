import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTransferService } from '@shared/services/dataTransferService.service';
import { Estimate } from '@shared/models/estimate.model';
import { EstimateService } from '@core/services/entities/estimate.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-opty-details-estimate',
  templateUrl: './opty-details-estimate.component.html',
  styleUrls: ['./opty-details-estimate.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: { style: 'width:100%' }
})
export class OptyDetailsEstimateComponent implements OnInit, OnDestroy {
  public estimate: Estimate[];
  private routerSub: Subscription;
  private estimateSub;
  constructor(
    private dataService: DataTransferService,
    private estimateService: EstimateService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.routerSub = this.activatedRoute.paramMap.subscribe(data => {
      const optyId = parseInt(data.get('optyId'), 10);
      this.estimateSub = this.estimateService.getEstimate(optyId).pipe(map((httpResp) => {
        return httpResp.body;
      })).subscribe(resp => {
        this.estimate = resp;
      });
    });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
    this.estimateSub.unsubscribe();
  }
}
