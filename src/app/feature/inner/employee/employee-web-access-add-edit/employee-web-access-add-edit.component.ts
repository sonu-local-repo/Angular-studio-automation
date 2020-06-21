import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeScreenView } from '../../settings/models/employee-screen-view.model';
import { ScreenViewGroup } from '../../settings/models/screen-view-group.model';
import { ScreenView } from '../../settings/models/screen-view.model';
import { SettingsService } from '../../settings/settings.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-web-access-add-edit',
  templateUrl: './employee-web-access-add-edit.component.html',
  styleUrls: ['./employee-web-access-add-edit.component.scss']
})
export class EmployeeWebAccessAddEditComponent implements OnInit {

  @Input() modules: any;

  employeeId: number;
  canAddNew = false;
  screenModules: ScreenViewGroup[];
  screenViews: ScreenView[];
  selectedModule: ScreenViewGroup;
  selectedView: ScreenView;
  addWebAccessFormGroup: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private settingsService: SettingsService,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit() {
    this.initVariables();
    this.getEmployeeScreens();
    this.getAllScreens();
    this.buildForm();
  }

  /* Private Methods */
  private initVariables() {
    this.employeeId = parseInt(this.activatedRoute.snapshot.paramMap.get('employeeId'), 0);
  }

  private getAllScreens() {
    this.settingsService.getAllScreens()
      .subscribe((data) => {
        this.screenModules = data;
      });
  }

  private getEmployeeScreens() {
    this.employeeService.getEmployeeScreens(this.employeeId)
      .subscribe((data) => {
        this.modules = data;
      });
  }

  private buildForm() {
    this.addWebAccessFormGroup = this.formBuilder.group({
      moduleName: new FormControl(null, [Validators.required]),
      viewName: new FormControl(null, [Validators.required]),
      canView: new FormControl(false),
      canEdit: new FormControl(false),
      canDelete: new FormControl(false),
    });
  }

  /* Public Methods */
  updateEmployeeWebAccess(view: EmployeeScreenView) {
    view.employeeId = this.employeeId;
    this.employeeService.updateEmployeeView(view).subscribe();
  }

  onModuleSelected(event: any, module: ScreenViewGroup) {
    if (event.isUserInput) {
      this.selectedModule = module;
      this.screenViews = module.views;
    }
  }

  onViewSelected(event: any, view: ScreenView) {
    if (event.isUserInput) {
      this.selectedView = view;
    }
  }

  addNewWebPermission() {
    if (this.addWebAccessFormGroup.invalid) {
      return;
    }

    const employeeScreenView = new EmployeeScreenView();
    employeeScreenView.name = this.selectedModule.moduleName;
    employeeScreenView.type = 'View';
    employeeScreenView.screenId = this.selectedView.id;
    employeeScreenView.moduleId = this.selectedView.moduleId;
    employeeScreenView.viewInt = this.addWebAccessFormGroup.value.canView;
    employeeScreenView.editInt = this.addWebAccessFormGroup.value.canEdit;
    employeeScreenView.deleteInt = this.addWebAccessFormGroup.value.canDelete;
    employeeScreenView.employeeId = this.employeeId;
    this.employeeService.createEmployeeView(employeeScreenView)
      .subscribe((data) => {
        this.canAddNew = false;
        this.getEmployeeScreens();
      });
  }
}
