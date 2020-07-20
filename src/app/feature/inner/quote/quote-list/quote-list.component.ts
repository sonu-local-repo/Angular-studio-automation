import { Component, OnInit, Input } from '@angular/core';
import {QuoteService } from '@core/services/entities/quote.service';
import {  ActivatedRoute } from '@angular/router';
import { Quote } from '@shared/models/quote.model';
import {map} from 'rxjs/operators';
import { QueryValueType } from '@angular/compiler/src/core';
import { MatTableDataSource, MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material';
import { CreateEstimateComponent } from '../../estimate/create-estimate/create-estimate.component';
@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss']
})
export class QuoteListComponent implements OnInit {

  quoteList: Quote[];
  dataSource: MatTableDataSource<Quote>;
  displayedColumns = ['id', 'optyId', 'accountId', 'rate', 'createdAt'];
  constructor(
    private quoteService: QuoteService,
    private activateRoute: ActivatedRoute,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.quoteService.getAllQuotes().pipe(
      map(data => {
        return data.body;
      })
    ).subscribe(result => {
      console.log(result);
      this.quoteList = result;
      this.dataSource = new MatTableDataSource(this.quoteList);
    });
  }

 
}
