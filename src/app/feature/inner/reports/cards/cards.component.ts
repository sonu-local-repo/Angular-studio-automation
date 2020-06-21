import { Component, HostListener } from '@angular/core';
import { ReportService } from '../report.service';
import { formatDate } from '@angular/common';
import { tap, map } from 'rxjs/operators';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})


export class CardsComponent {
  screenHeight: number;
  screenWidth: number;

  view: any[] = [700, 400];
  lineChartview: any[] = [700, 600];
  orderLine: IItem[] = [];
  dateRange = [];
  data = [];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Number of Orders';
  yMinValue = -1;
  animations = true;
  autoScale = false;
  colorScheme = {
    domain: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600']
  };
  // cardColor = '#ffffff';
  dataLoadedComplete = false;
  lineChartLoadComplete = false;
  constructor(
    private reportsService: ReportService
  ) {
    const qString =
      'SELECT COUNT(1) AS COUNT, \'Total Orders\' AS TYPE FROM ORDERS WHERE STATUS <> \'Closed\' AND ORG_ID=\'50\' ' +
      'UNION SELECT COUNT(1) AS COUNT, \'Albums\'  AS TYPE  FROM ORDERS WHERE SUB_TYPE = \'Album\' AND ORG_ID=\'50\' ' +
      'UNION SELECT COUNT(1) AS COUNT, \'Tasks\' AS TYPE FROM TASK_LIST WHERE ORG_ID=\'50\'';
    this.reportsService.executeQuery(qString).subscribe(data => {
      data.map(item => {
        this.data.push({ name: item.TYPE, value: parseFloat(item.COUNT) });
        this.getScreenSize();
        // Object.assign  (this., this.data);
        this.dataLoadedComplete = true;
      });
    });
    const orderQString = 'SELECT ' +
      'if(ORDERS.TYPE IS NULL,\'\', ORDERS.TYPE) AS TYPE, ' +
      'b.Days AS DT, IF(ORDERS.TYPE IS NULL, \'0\', COUNT(1)) AS COUNT ' +
      'FROM ' +
      '(SELECT a.Days ' +
      'FROM ( ' +
      'SELECT curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY AS Days ' +
      'FROM  (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS a ' +
      'CROSS JOIN (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS b ' +
      'CROSS JOIN (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS c ' +
      ') a ' +
      'WHERE a.Days >= curdate() - INTERVAL 50 DAY) b ' +
      'LEFT OUTER JOIN ORDERS ON ' +
      'DATE(CREATED_AT)=b.Days ' +
      'GROUP BY ' +
      'ORDERS.TYPE, ' +
      'b.Days';
    // const orderQString = 'SELECT TYPE, DATE_FORMAT(CREATED_AT, "%c/%d/%Y") AS DT, SUB_TYPE,  COUNT(1) AS COUNT FROM ORDERS WHERE ' +
    //   'TYPE IS not NULL group BY DATE_FORMAT(CREATED_AT, "%c/%d/%Y"), TYPE';
    const types = ['Design', 'Lamination', 'Momentous', 'Phot Goods', 'Printing'];
    this.reportsService.executeQuery(orderQString).subscribe(data => {
      const dt = [];
      data.map(t => {
        if (t.COUNT === '0') {
          types.forEach(type => {
            dt.push({
              TYPE: type,
              DT: t.DT,
              COUNT: 0
            });
          });
        } else {
          dt.push(t);
        }
      });
      data = dt;
      this.getScreenSize();
      data.map(item => {
        if (this.orderLine.length === 0) {
          this.orderLine.push({
            name: item.TYPE,
            series: [{
              name: new Date(item.DT),
              value: parseInt(item.COUNT, 10)
            }]
          });
        } else {
          let elemFound = false;
          this.orderLine.forEach(element => {
            if (element.name === item.TYPE) {
              element.series.push({
                name: new Date(item.DT),
                value: parseInt(item.COUNT, 10)
              });
              elemFound = true;
            }
          });
          if (!elemFound) {
            const x = [];
            this.dateRange.forEach(element => {
              x.push({
                name: element,
                value: 0
              });
            });
            this.orderLine.push({
              name: item.TYPE,
              series: [{
                name: new Date(item.DT),
                value: parseInt(item.COUNT, 10)
              }]
            });
          }
        }

      });
      this.lineChartLoadComplete = true;
    });
  }

  onSelect(event) {
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    const setScreenSize = Math.floor(this.screenWidth * 0.9);
    this.view = [`${setScreenSize}`, 200];
    this.lineChartview = [Math.floor(this.screenWidth * 0.85), 400];
  }

}

export interface IItem {
  name?: string;
  series?: [{ name: Date, value: number }];
}
