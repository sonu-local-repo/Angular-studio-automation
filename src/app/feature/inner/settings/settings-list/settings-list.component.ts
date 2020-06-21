import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ScreenViewGroup } from '../models/screen-view-group.model';
import { SettingsService } from '../settings.service';
import { ScreenView } from '../models/screen-view.model';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss']
})
export class SettingsListComponent implements OnInit {

  modules: ScreenViewGroup[];
  pageConfigForm: FormGroup;
  screenType: 'View' | 'Module';

  constructor(
    private settingsService: SettingsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getAllScreens();
    this.screenType = 'Module';
  }

  /* Private Methods */
  private buildForm() {
    this.pageConfigForm = this.formBuilder.group({
      module: new FormControl(null),
      viewName: new FormControl(null),
    });
  }

  /* Public Methods */
  getAllScreens() {
    this.settingsService.getAllScreens().subscribe((data) => {
      this.modules = data;
    });
  }

  addNewScreen() {
    const screenView = new ScreenView();
    screenView.name = this.pageConfigForm.value.viewName;
    screenView.type = this.screenType;
    screenView.moduleId = this.screenType === 'View' ? this.pageConfigForm.value.module.id : null;
    screenView.status = 'Active';
    this.settingsService.createScreen(screenView).subscribe((data) => {
      this.getAllScreens();
    });
  }

  onValChange(type: 'View' | 'Module') {
    this.screenType = type;
  }
}
