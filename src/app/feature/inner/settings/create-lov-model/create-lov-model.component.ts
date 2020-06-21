import { Component, OnInit, Optional, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lov } from '@shared/models/lov-model';
import { SettingsService } from '../settings.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-lov-model',
  templateUrl: './create-lov-model.component.html',
  styleUrls: ['./create-lov-model.component.scss']
})
export class CreateLovModelComponent implements OnInit {

  addLovFormGroup: FormGroup;
  parentLov = [];
  lovType = ['LOV_TYPE'];
  message = '';
  activeStatus = true;
  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private matDialogRef: MatDialogRef<CreateLovModelComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) { }

  ngOnInit() {
    this.getLov();
    if (this.inputData.lov) {
      this.activeStatus = this.inputData.lov.status === 'Active' ? true : false;
    }
    this.buildForm(this.inputData.lov);
  }
  captureEvent($event) {
  }

  buildForm(inputData: Lov) {
    this.addLovFormGroup = this.formBuilder.group({
      type: [inputData ? inputData.type : '', Validators.required],
      subType: [inputData ? inputData.subType : ''],
      description: [inputData ? inputData.description : ''],
      value: [inputData ? inputData.value : '', Validators.required],
      status: [inputData ? inputData.status : 'Active']
    });
  }

  createNewLov() {
    if (this.addLovFormGroup.valid) {
      const lov = new Lov();
      lov.type = this.addLovFormGroup.value.type;
      lov.subType = this.addLovFormGroup.value.subType;
      lov.description = this.addLovFormGroup.value.description;
      lov.value = this.addLovFormGroup.value.value;
      lov.status = this.addLovFormGroup.value.status;
      if (this.inputData.action === 'add') {
        this.settingsService.insertListOfValues(lov).subscribe(() => {
          this.matDialogRef.close();
        },
          (error) => {
            this.message = 'Unable to save the record. Please try again';
          });
      } else {
        // console.log('edit Lov');
        // console.log(lov.id);
        lov.id = this.inputData.lov.id;
        lov.orgId = this.inputData.lov.orgId;
        this.settingsService.updateListOfValue(lov, this.inputData.lov.id).subscribe(() => {
          this.matDialogRef.close();
        },
          (error) => {
            this.message = 'Unable to save the record. Please try again';
          });
      }
    } else {
      this.addLovFormGroup.markAllAsTouched();
    }

  }

  getLov() {
    this.settingsService.getListofValues().subscribe(data => {
      data.map((item) => {
        if (item.type === 'LOV_TYPE') {
          if (this.lovType.indexOf(item.value) === -1) {
            this.lovType.push(item.value);
          }
        }
        if (item.type !== 'LOV_TYPE' && item.subType === '') {
          if (this.parentLov.indexOf(item.value) === -1) {
            this.parentLov.push(item.value);
          }
        }
      });
    });
  }
}
