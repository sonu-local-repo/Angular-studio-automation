import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {id} from "@swimlane/ngx-charts";
import {SettingsService} from "../settings.service";
import {ResponsibilityModel} from "../models/responsibility.model";

@Component({
  selector: 'app-responsibility-profile',
  templateUrl: './responsibility-profile.component.html',
  styleUrls: ['./responsibility-profile.component.scss']
})
export class ResponsibilityProfileComponent implements OnInit {

  respId: number;
  resp: ResponsibilityModel;

  constructor(private activatedRoute: ActivatedRoute, private settingsService: SettingsService) { }

  ngOnInit() {
    this.respId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.settingsService.getResponsibilityById(this.respId).subscribe(data=>{
      this.resp = data
    });
  }

}
