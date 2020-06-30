import {Component, Inject, Injectable, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SettingsService} from "../settings.service";
import {MatTableDataSource} from "@angular/material/table";
import {ResponsibilityModel} from "../models/responsibility.model";
import {Employee} from "../../employee/models/employee.model";
import {MatPaginator} from "@angular/material/paginator";
import {ViewModel} from "../models/view.model";
import {ModalService} from "@shared/services/modal.service";
import {ViewAddComponent} from "../view-add/view-add.component";
import {flatMap} from "rxjs/operators";

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'status',  'actions'];
  cancelled = false;
  views: MatTableDataSource<ViewModel> = new MatTableDataSource([]);
  resultlength = 0;
  @ViewChild(MatPaginator, { static: true }) matPaginator: MatPaginator;
  constructor(private settingsService: SettingsService, private dialogRef: MatDialogRef<ViewsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private modalService: ModalService) { }

  ngOnInit() {

    this.fetchAllViews();

  }

  fetchAllViews(){
    if (!this.cancelled) {
      this.settingsService.getAllViews().subscribe(data=>{
        this.views.data = data.content;
        this.resultlength = data.totalElements;
        this.views.paginator = this.matPaginator;
      })
    }
  }

  attachView(view: any) {
    this.dialogRef.close(view);

  }

  onCancel() {
    this.dialogRef.close()
  }

  addView() {
    const dialogConfig = this.modalService.setDialogConfig(true, true, '780px', this.views);
      this.dialog.open(ViewAddComponent, dialogConfig).afterClosed()
        .subscribe(data=>{
        this.settingsService.createView(data).subscribe(data=>this.fetchAllViews());
      })
  }

}
