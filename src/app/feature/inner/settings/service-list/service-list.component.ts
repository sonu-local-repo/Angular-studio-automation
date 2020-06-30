import {Component, OnInit, ViewChild} from '@angular/core';
import {SettingsService} from "../settings.service";
import {Router} from "@angular/router";
import {ModalService} from "@shared/services/modal.service";
import {PermissionService} from "@core/services/permission.service";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {ViewAddComponent} from "../view-add/view-add.component";
import {MatTableDataSource} from "@angular/material/table";
import {ResponsibilityModel} from "../models/responsibility.model";
import {Employee} from "../../employee/models/employee.model";
import {ScreenName} from "@shared/enums/screen-name.enum";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {

  serviceList: MatTableDataSource<ResponsibilityModel> = new MatTableDataSource([]);
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
      this.serviceList.data = data.content;
      this.serviceList.paginator = this.matPaginator;
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
