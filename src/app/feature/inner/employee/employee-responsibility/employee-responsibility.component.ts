import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ResponsibilityModel} from "../../settings/models/responsibility.model";
import {Employee} from "../models/employee.model";
import {MatPaginator} from "@angular/material/paginator";
import {SettingsService} from "../../settings/settings.service";
import {Router} from "@angular/router";
import {EmployeeService} from "../employee.service";
import {MatDialog} from "@angular/material/dialog";
import {ViewAddComponent} from "../../settings/view-add/view-add.component";
import {ModalService} from "@shared/services/modal.service";
import {ResponsibilityListComponent} from "../responsibility-list/responsibility-list.component";
import {EmployeeResponsibilityAssoc} from "../models/employee-responsibility-assoc";
import {ConfirmModalComponent} from "@shared/components/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-employee-responsibility',
  templateUrl: './employee-responsibility.component.html',
  styleUrls: ['./employee-responsibility.component.scss']
})
export class EmployeeResponsibilityComponent implements OnInit, AfterViewInit {
  @Input() employeeDetails: number;
  // respList: MatTableDataSource<ResponsibilityModel> = new MatTableDataSource([]);
  respList: [];
  employees: Employee[];
  resultlength = 0;
  displayedColumns: string[] = [ 'id','name',  'status','actions'];
  @ViewChild(MatPaginator, { static: true }) matPaginator: MatPaginator;

  constructor(private settingService: SettingsService, private router: Router, private employeeService: EmployeeService,
              private dialog: MatDialog, private modalService: ModalService) { }

  ngOnInit() {
    this.fetchEmployee();
  }
  fetchEmployee(){
    this.employeeService.getEmployee(this.employeeDetails)
      .subscribe(
        (data) => {
          console.log(data);
          // @ts-ignore
          this.respList = data.responsibilities;
        }
      );
  }
  ngAfterViewInit(){
    console.log(this.employeeDetails);
  }
  navigateTo(id: any) {
    console.log(id);
    this.router.navigateByUrl(`settings/${id}`);
  }

  associateResponsibility() {
    const dialogConfig = this.modalService.setDialogConfig(true, true, '780px');

    this.dialog.open(ResponsibilityListComponent, dialogConfig).afterClosed()
      .subscribe(data=>{
        let employeeRes = new EmployeeResponsibilityAssoc();
        employeeRes.employeeId = this.employeeDetails;
        employeeRes.responsibilityId = data.id;
        this.employeeService.associateResponsibility(employeeRes).subscribe(data=>this.fetchEmployee());
        // this.settingsService.createView(data)
      })
  }

  deleteResponsibilityAssociation(data: any) {
    const confirm = { question: `Are you sure to delete the responsibility association: `, alternativeText: data.name, yes: 'Delete', no: 'Cancel' };
    const dialogConfig = this.modalService.setDialogConfig(true, false, '780px', confirm);
    this.dialog.open(ConfirmModalComponent, dialogConfig)
      .afterClosed().subscribe(flag => {
      if (flag) {
        let employeeRes = new EmployeeResponsibilityAssoc();
        employeeRes.employeeId = this.employeeDetails;
        employeeRes.responsibilityId = data.id;
        this.employeeService.deleteEmployeeResponsibilityAssociation(employeeRes).subscribe(data=>this.fetchEmployee());
      }
    });


  }
}
