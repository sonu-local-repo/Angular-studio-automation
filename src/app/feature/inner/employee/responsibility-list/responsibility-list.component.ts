import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ResponsibilityModel} from "../../settings/models/responsibility.model";
import {Employee} from "../models/employee.model";
import {MatPaginator} from "@angular/material/paginator";
import {SettingsService} from "../../settings/settings.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-responsibility-list',
  templateUrl: './responsibility-list.component.html',
  styleUrls: ['./responsibility-list.component.scss']
})
export class ResponsibilityListComponent implements OnInit {

  respList: MatTableDataSource<ResponsibilityModel> = new MatTableDataSource([]);
  employees: Employee[];
  resultlength = 0;
  displayedColumns: string[] = [ 'id','name',  'status','actions'];
  @ViewChild(MatPaginator, { static: true }) matPaginator: MatPaginator;

  constructor(private settingService: SettingsService, private router: Router,
              private diaglogRef: MatDialogRef<ResponsibilityListComponent>) { }

  ngOnInit() {
    this.settingService.getResponsibilities().subscribe(data=>{
      this.respList.data = data.content;
      this.respList.paginator = this.matPaginator;
      this.resultlength = data.totalElements;

      console.log(data)
    })
  }

  attachView(resp: any) {
    this.diaglogRef.close(resp);
  }

  onCancel() {
    this.diaglogRef.close();
  }
}
