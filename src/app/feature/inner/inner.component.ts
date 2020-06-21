import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BRAND_NAME } from '@shared/configs/globals';
import { ErrorService } from '@shared/services/error.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-inner',
  templateUrl: './inner.component.html',
  styleUrls: ['./inner.component.scss']
})
export class InnerComponent {

  somethingWentWrong = false;
  leftNavOpen = false;
  brandName = BRAND_NAME;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private router: Router,
    private errorService: ErrorService,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.subscribeEvents();

  }

  /* Private Methods */
  private subscribeEvents() {
    this.errorService.somethingWentWrong$.subscribe((flag: boolean) => {
      this.somethingWentWrong = flag;
    });

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.errorService.hideSomeThingWentWrongMessage();
      }
    });
  }

  /* Public Methods */
  toggleLeftNav() {
    this.leftNavOpen = !this.leftNavOpen;
  }
}
