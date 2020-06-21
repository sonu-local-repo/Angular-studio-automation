import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ActionService } from '@shared/services/action.service';
import { OrderPage } from '../models/order-page.model';

@Component({
  selector: 'app-order-page-tasks',
  templateUrl: './order-page-tasks.component.html',
  styleUrls: ['./order-page-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPageTasksComponent implements OnInit, OnChanges {

  @Input() pages: OrderPage[];
  @Input() isReadonly: boolean;
  @Input() updateCounter = 0;
  @Output() removePropertyFromPage = new EventEmitter();


  pagesGroupedByType: any = [];
  collapsed: any;
  constructor(
    private actionService: ActionService,
  ) { }

  ngOnInit() {
    this.setPageTask();
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (!changes) {
    //   this.setPageTask();
    // }

    // if (changes.updateCounter
    //   && changes.updateCounter.previousValue !== changes.updateCounter.currentValue) {
    //   this.setPageTask();
    // }
    if (changes) {
      this.setPageTask();
      // console.log('updated');
    }
  }

  /* Private Methods */
  private setPageTask() {
    let tags = [];

    this.pages.map((page) => {
      if (page.pageDetails.length > 0) {
        const pageDetails = page.pageDetails;
        pageDetails.map((detail) => { detail.pageNo = page.pageNo; });
        tags = tags.concat(pageDetails);
      }
    });

    const mainList = this.actionService.groupBy(tags, 'type');
    const refinedMainList = [];

    for (const mainProp in mainList) {
      debugger;
      if (Object.prototype.hasOwnProperty.call(mainList, mainProp)) {
        const childList = this.actionService.groupBy(mainList[mainProp], 'value');
        const refinedChild = [];
        for (const childProp in childList) {
          if (Object.prototype.hasOwnProperty.call(childList, childProp)) {
            refinedChild.push({ type: childProp, child: childList[childProp] });
          }
        }
        refinedMainList.push({ type: mainProp, child: refinedChild });
      }
    }

    if (this.isReadonly) {
      refinedMainList.map((main) => {
        main.child.map((sub) => {
          sub.child = sub.child.map((inner) => inner.pageNo);
          sub.child = this.setSelectedPageInOneLine(sub.child);
        });
      });
    }


    this.pagesGroupedByType = refinedMainList;
  }

  private setSelectedPageInOneLine(list) {
    debugger;
    let pageNumbersLine = '';
    const result = list.reduce((r, n) => {
      debugger;
      const lastSubArray = r[r.length - 1];

      if (!lastSubArray || lastSubArray[lastSubArray.length - 1] !== n - 1) {
        r.push([]);
      }

      r[r.length - 1].push(n);

      return r;
    }, []);

    result.map((group) => {
      if (group.length === 1) {
        pageNumbersLine = pageNumbersLine + `${group[0]}, `;
      } else {
        pageNumbersLine = pageNumbersLine + `${group[0]} - ${group[group.length - 1]}, `;
      }
    });
    return pageNumbersLine.replace(/,\s*$/, '').split(',');
  }

  /* Public Methods */

  isMultiPage(page) {
    return page.includes('-');
  }

  trackByFn(index, item) {
    return index;
  }

  onRemovePage(task, $event) {
    // console.log($event);
    $event.preventDefault();
    $event.stopPropagation();
    this.removePropertyFromPage.emit({ task });
    $event.preventDefault();
    $event.stopPropagation();

  }
}
