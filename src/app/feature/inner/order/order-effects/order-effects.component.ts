import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../settings/settings.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-order-effects',
  templateUrl: './order-effects.component.html',
  styleUrls: ['./order-effects.component.scss']
})
export class OrderEffectsComponent implements OnInit {

  private lovData;
  private effectsList = [];
  constructor(private settingsService: SettingsService, private dialogRef: MatDialogRef<OrderEffectsComponent>,) { }

  ngOnInit() {
    this.getLOVDetails();
  }

  getLOVDetails(){
    this.settingsService.getListofValues().subscribe(data => {
      this.lovData = data;

      data.filter((item) => item.type === 'ALBUM_PAGE' && item.subType === 'Effects' && item.status === 'Active').map(val => {
        // console.log(val)
        this.effectsList.push({
          value: val.value,
          text: val.value
        });
      })
    });
  }

  close(value: string) {
    if (value == null) {
      this.dialogRef.close();
    }
    else {

      // console.log()
      this.dialogRef.close({ save: true, data: value});
    }
  }
}
