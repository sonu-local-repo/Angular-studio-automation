import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-scroll-layout',
  templateUrl: './page-scroll-layout.component.html',
  styleUrls: ['./page-scroll-layout.component.scss']
})
export class PageScrollLayoutComponent implements OnInit {

  @Input() gutter;

  constructor() { }

  /* Lifecycle Hooks */
  ngOnInit() {
  }

  /* Public Methods */
  setStyles() {
    if (!this.gutter) {
      this.gutter = 20;
    }
    const styles = {
      'max-height': `calc(100% - ${this.gutter}px)`,
      'margin-bottom': `-${this.gutter}px`
    };
    return styles;
  }

}
