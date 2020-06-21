import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-data-message',
  templateUrl: './no-data-message.component.html',
  styleUrls: ['./no-data-message.component.scss']
})
export class NoDataMessageComponent implements OnInit {

  @Input() visible: boolean;

  constructor() { }

  /* Lifecycle Hooks */
  ngOnInit() {
  }

}
