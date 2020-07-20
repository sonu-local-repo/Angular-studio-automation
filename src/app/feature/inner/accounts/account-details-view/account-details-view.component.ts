import { Component, OnInit } from '@angular/core';
import {Account} from '@shared/models/account.model';

@Component({
  selector: 'app-account-details-view',
  templateUrl: './account-details-view.component.html',
  styleUrls: ['./account-details-view.component.scss']
})
export class AccountDetailsViewComponent implements OnInit {
account = new Account();
// tslint:disable-next-line:align
constructor() {
      this.account.name = 'Deepak Sukumaran';
      this.account.id = 2;
      this.account.email = 'abc@mail.com';
      // this.account.address = '7575 Frankford Rd, Dallas 75252 TX';
      // this.account.contactPerson = 'Test Account';
      // this.account.assignedTo = 'Deepak';
    }

ngOnInit() {

    }
}
