import { Component, OnInit } from '@angular/core';
import { Opportunity } from '@shared/models/opty.model';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataTransferService } from '@shared/services/dataTransferService.service';
import { Quote } from '@shared/models/quote.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ComposeEmailComponent } from '@shared/components/compose-email/compose-email.component';

@Component({
  selector: 'app-opty-details-sidepanel',
  templateUrl: './opty-details-sidepanel.component.html',
  styleUrls: ['./opty-details-sidepanel.component.scss']
})
export class OptyDetailsSidepanelComponent implements OnInit {

  opty: Opportunity;
  quoteObs: Observable<Quote>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataTransferService,
    private matDialog: MatDialog,
  ) {

  }
  ngOnInit() {
    this.dataService.getData.subscribe(ip => {
      this.opty = ip.opty;
    });
  }

  composeEmail() {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.width = '50%';
    matDialogConfig.height = '80%';
    matDialogConfig.autoFocus = true;
    matDialogConfig.data = {
      email: this.opty.accounts[0].email
    };
    console.log('Opportunity' + matDialogConfig);
    this.matDialog.open(ComposeEmailComponent, matDialogConfig);
  }
}
