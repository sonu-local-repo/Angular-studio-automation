import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Task} from "../../tasks/model/task";
import {Employee} from "../../employee/models/employee.model";
import {MatPaginator} from "@angular/material/paginator";
import {SettingsService} from "../settings.service";
import {ResponsibilityModel} from "../models/responsibility.model";
import {Router} from "@angular/router";
import {PermissionService} from "@core/services/permission.service";
import {ScreenName} from "@shared/enums/screen-name.enum";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ViewAddComponent} from "../view-add/view-add.component";
import {ModalService} from "@shared/services/modal.service";

@Component({
  selector: 'app-responsibilities',
  templateUrl: './responsibilities.component.html',
  styleUrls: ['./responsibilities.component.scss']
})
export class ResponsibilitiesComponent implements OnInit {

  respList: MatTableDataSource<ResponsibilityModel> = new MatTableDataSource([]);
  employees: Employee[];
  screenName = ScreenName;
  searchForm: FormGroup;
  resultlength = 0;
  displayedColumns: string[] = [ 'id','name',  'status','actions'];
  @ViewChild(MatPaginator, { static: true }) matPaginator: MatPaginator;

  constructor(private settingService: SettingsService, private router: Router, private modalService: ModalService,
              private permissionService: PermissionService, private dialog: MatDialog) { }

  ngOnInit() {
    this.buildForm();
    this.fetchResponsibilities();

  }
  fetchResponsibilities(){
    this.settingService.getResponsibilities().subscribe(data=>{
      this.respList.data = data.content;
      this.respList.paginator = this.matPaginator;
      this.resultlength = data.totalElements;

      console.log(data)
    })
  }
  private buildForm() {
    this.searchForm = new FormGroup({
      custName: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
    });
  }

  navigateTo(id: any) {
      this.router.navigateByUrl(`settings/${id}`)
  }

  createNewResponsibility() {
    const dialogConfig = this.modalService.setDialogConfig(true, true, '780px');
    this.dialog.open(ViewAddComponent, dialogConfig).afterClosed()
      .subscribe(data=>{
        console.log("test"+data)
        if (data) {
          data.status = 'Active';
          this.settingService.createResponsibility(data).subscribe(data=>this.fetchResponsibilities());
        }

      })
  }

  onSearch() {

  }
}
