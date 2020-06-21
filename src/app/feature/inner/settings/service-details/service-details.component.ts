import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Services } from '../models/services.model';
import { SettingsService } from '../settings.service';
import { Lov } from '@shared/models/lov-model';
import { MatDialog, MatDialogConfig, MatPaginator } from '@angular/material';
import { CreateLovModelComponent } from '../create-lov-model/create-lov-model.component';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from '../../employee/employee.service';
import { EmployeeFilterParams } from '../../employee/models/employee-filter-params.model';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {
  searchForm: FormGroup;
  resultLength = 0;
  listOfValues: MatTableDataSource<Lov>;
  displayedColumns = ['id', 'type', 'subtype', 'value', 'status', 'description', 'action'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private settingsService: SettingsService,
    private matDialog: MatDialog,
    private http: HttpClient,
    private employeeService: EmployeeService,
  ) {
  }

  private buildForm() {
    this.searchForm = new FormGroup({
      value: new FormControl(''),
    });
  }


  onSearch() {
    let searchString = this.searchForm.value.value;
    searchString = searchString.trim(); // Remove whitespace
    searchString = searchString.toLowerCase();
    this.listOfValues.filter = searchString;
  }

  ngOnInit() {
    this.buildForm();
    this.getLov();
  }

  getLov() {
    this.settingsService.getListofValues().subscribe(data => {
      this.resultLength = data.length;
      this.listOfValues = new MatTableDataSource(data);
      this.listOfValues.paginator = this.paginator;
    });
  }

  createNewLovs(element: Lov = null) {
    const matDialogConfig = new MatDialogConfig();
    // matDialogConfig.width = '60%';
    matDialogConfig.autoFocus = true;
    matDialogConfig.disableClose = true;
    matDialogConfig.data = {
      lov: element,
      action: element ? 'edit' : 'add'
    };
    const dialog = this.matDialog.open(CreateLovModelComponent, matDialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.getLov();
    });
  }

  onClearSearch() {
    this.searchForm.setValue({
      value: ''
    });
    this.listOfValues.filter = '';
  }
}
