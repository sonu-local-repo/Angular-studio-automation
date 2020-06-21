import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatTableDataSource, MatDialogRef } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-choose-item-modal',
  templateUrl: './choose-item-modal.component.html',
  styleUrls: ['./choose-item-modal.component.scss']
})
export class ChooseItemModalComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['name'];
  matDialogRef: MatDialogRef<ChooseItemModalComponent>;
  selection: SelectionModel<any>;
  constructor(
    @Inject(MAT_DIALOG_DATA) private input: string[]
  ) {

  }

  ngOnInit() {
    this.selection = new SelectionModel(true, []);
    this.dataSource = new MatTableDataSource(this.input);
  }
  toggleSelection($event, row) {
    if ($event) {
      this.selection.toggle(row);
    }
  }
}
