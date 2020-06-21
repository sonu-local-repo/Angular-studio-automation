import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-task-notes',
  templateUrl: './task-notes.component.html',
  styleUrls: ['./task-notes.component.scss']
})
export class TaskNotesComponent implements OnInit {
  public formGroup: FormGroup;
  notes: string;


  constructor(private dialogRef: MatDialogRef<TaskNotesComponent>, @Inject(MAT_DIALOG_DATA) private data, private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      notes: ''
    })
  }

  cancelTask() {
    this.dialogRef.close();
  }

  completeTask(notes: string) {
    this.dialogRef.close(this.formGroup.value.notes);
  }
}
