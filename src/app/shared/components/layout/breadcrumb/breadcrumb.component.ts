import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { BreadCrumb } from './breadcrumb.model';
import { BreadcrumbService } from './breadcrumb.service';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs: BreadCrumb[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
  ) {
    this.subscribeEvents();
  }

  /* Lifecycle Hooks */
  ngOnInit() {
  }

  /* Private Methods */
  private subscribeEvents() {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        const root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
      }
    });

    this.breadcrumbService.dynamicData$.subscribe((data: KeyValue<string, string>[]) => {
      this.setDynamicData(data);
    });
  }

  private setDynamicData(data: KeyValue<string, string>[]) {
    data.forEach((item) => {
      this.breadcrumbs.map((crumb) => {
        if (item.key === crumb.label) {
          crumb.label = item.value;
        }
        return crumb;
      });
    });
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []) {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
      const crumbData = child.snapshot.data[ROUTE_DATA_BREADCRUMB];
      if (routeURL !== '') {
        url += `/${routeURL}`;
        const label = crumbData;
        const breadcrumb: BreadCrumb = {
          label,
          params: child.snapshot.params,
          url
        };
        breadcrumbs.push(breadcrumb);
      }

      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
}
