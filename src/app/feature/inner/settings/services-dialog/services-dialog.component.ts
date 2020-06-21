import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Services } from '../models/services.model';
import { SettingsService } from '../settings.service';
import { Service } from '../../other/models/service.model';

@Component({
  selector: 'app-services-dialog',
  templateUrl: './services-dialog.component.html',
  styleUrls: ['./services-dialog.component.scss']
})
export class ServicesDialogComponent implements OnInit {

  formGroup: FormGroup;
  data: Services;
  action: string;
  dataStatus: string;
  constructor(
    private settingsService: SettingsService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public input: any,
    private matDialogRef: MatDialogRef<ServicesDialogComponent>
  ) {
    this.data = this.input.data;
    this.action = this.input.mode;
    this.dataStatus = this.data.status;
  }

  ngOnInit() {
    this.buildForm();
    if (this.action === 'Edit') {
      this.formGroup.setValue({
        name: this.data.name,
        status: this.data.status,
        type: this.data.type
      });
    } else {
      this.formGroup.setValue({
        name: null,
        status: 'Active',
        type: this.data.name
      });
      // console.log(this.formGroup.value);
    }

  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      type: ['', Validators.required]
    });

  }

  saveRecord() {
    if (this.formGroup.valid) {
      const service = new Services();
      service.status = this.formGroup.value.status;
      service.type = this.formGroup.value.type;
      service.name = this.formGroup.value.name;
      if (this.action === 'Add') {
        this.settingsService.createService(service).subscribe(data => {
        });
      } else {
        this.settingsService.updateService(service, this.data.id).subscribe(data => {
        });
      }
      this.matDialogRef.close();
    } else {
    this.formGroup.markAllAsTouched();
    }
  }
}
