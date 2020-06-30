import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-view-add',
  templateUrl: './view-add.component.html',
  styleUrls: ['./view-add.component.scss']
})
export class ViewAddComponent implements OnInit {

  viewFormGroup: FormGroup;

  constructor(private matDialogRef: MatDialogRef<ViewAddComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.formBuilder();
  }

  private formBuilder(){
    this.viewFormGroup = this.fb.group({
     /* name: new FormControl(null, [Validators.required]),
      status: new FormControl("Active", [Validators.required])*/
     name: [null, Validators.required],
      status: ["Active", Validators.required]
    })
  }

  onCancel() {
    this.matDialogRef.close();
  }

  onSave() {
      this.matDialogRef.close(this.viewFormGroup.value)
  }
}
