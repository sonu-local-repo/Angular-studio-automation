import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-label-text-combo',
  templateUrl: './label-text-combo.component.html',
  styleUrls: ['./label-text-combo.component.scss']
})
export class LabelTextComboComponent implements OnInit {

  @Input() icon: string;
  @Input() label: string;
  @Input() text: string;

  constructor() { }

  /* Lifecycle Hooks */
  ngOnInit() {
  }

}
