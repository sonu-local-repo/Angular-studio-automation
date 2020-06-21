import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { INDIAN_STATE_LIST } from '@shared/constants/state-list.constant';
import { ActionService } from '@shared/services/action.service';
import { ModalService } from '@shared/services/modal.service';
import { PositionService } from '../../other/position.service';
import { EmployeeConstants } from '../employee-constatnts';
import { EmployeeService } from '../employee.service';
import { EmployeePosition } from '../models/employee-position.model';
import { Employee } from '../models/employee.model';

import {EmployeeDepartment} from "../models/employee-department.model";
import {DepartmentService} from "../../other/department.service";
import {ErrorService} from "@shared/services/error.service";


@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnInit {

  isEditMode: boolean;
  errorMsg: string = null;
  employeeDetails: Employee;
  employeeFormGroup: FormGroup;
  genderList = EmployeeConstants.genderList;
  stateList = INDIAN_STATE_LIST;
  positionList: EmployeePosition[];
  departmentList: EmployeeDepartment[];
  maxDob = new Date();

  private get addresses(): FormArray { return this.employeeFormGroup.get('addresses') as FormArray; }

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private positionService: PositionService,
    private departmentService: DepartmentService,
    private actionService: ActionService,
    private errorService: ErrorService,
    private modalService: ModalService,
    private dialogRef: MatDialogRef<EmployeeAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.isEditMode = !actionService.isAllNullOrEmptyObject(data);
    this.employeeDetails = data ? data.employee : null;
  }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.buildForm();
    this.bindFormData();
    this.getAllPositions();
    this.getAllDepartments();
  }

  /* Private Methods */
  private buildForm() {
    this.employeeFormGroup = this.formBuilder.group({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      dob: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null,
        [Validators.pattern('[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
      addresses: this.formBuilder.array([]),
      // positions: new FormControl([], [Validators.required]),
      departments: new FormControl([], [Validators.required]),
    });

    if (!this.isEditMode) {
      this.buildAddressForm();
    }
  }

  private buildAddressForm() {
    this.addresses.push(
      this.formBuilder.group({
        id: new FormControl(null),
        address1: new FormControl(null),
        address2: new FormControl(null),
        city: new FormControl(null),
        state: new FormControl('KL'),
        zip: new FormControl(null),
        landmark: new FormControl(null),
      })
    );
  }

  private bindFormData() {
    if (!this.isEditMode) { return; }

    this.employeeDetails.addresses.forEach(x => {
      this.buildAddressForm();
    });

    if (this.employeeDetails.addresses.length === 0) {
      this.buildAddressForm();
    }

    this.employeeFormGroup.patchValue(this.employeeDetails);
    this.employeeFormGroup.patchValue({ dob: new Date(this.employeeDetails.dob) });
  }

  private addEmployee(employee: Employee) {
    employee.doj = '2019-11-03';
    employee.userName = this.employeeFormGroup.value.firstName + '@123';
    employee.password = 'password';

    this.employeeService.createEmployee(employee)
      .subscribe((data) => {
        this.modalService.showNotification('New employee created', 'Close');
        this.dialogRef.close(true);
      },
        (error) => {
          this.errorMsg = error.error.split(":")[1];
        }
      );
  }

  private updateEmployee(employee: Employee) {
    this.employeeService.updateEmployee(employee).subscribe((data) => {
      this.dialogRef.close(true);
    });
  }

  private getAllPositions() {
    this.positionService.getAllPositions().subscribe((data) => {
      this.positionList = data;
    });
  }


  private getAllDepartments() {
    this.departmentService.getAllDepartments().subscribe((data) => {
      // data.map(d => console.log(d))
      this.departmentList = data;
    });
  }

  /* Public Methods */
  comparePositions(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onSave() {

    if (this.employeeFormGroup.invalid) { return; }

    let employee = new Employee();

    if (!this.isEditMode) {
      employee = this.employeeFormGroup.value;
      this.addEmployee(employee);
    } else {
      employee = this.employeeDetails;
      employee = Object.assign(employee, this.employeeFormGroup.value);
      this.updateEmployee(employee);
    }
  }
}
