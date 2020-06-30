import {Component, Input, OnInit} from '@angular/core';
import {SettingsService} from "../settings.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalService} from "@shared/services/modal.service";
import {EmployeeAddEditComponent} from "../../employee/employee-add-edit/employee-add-edit.component";
import {ViewsComponent} from "../views-list/views.component";
import {ViewModel} from "../models/view.model";
import {ResponsibilityViewModel} from "../models/responsibility-view.model";
import {Observable} from "rxjs";
import {ResponsibilityModel} from "../models/responsibility.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ScreenView} from "../models/screen-view.model";
import {ConfirmModalComponent} from "@shared/components/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-responsibility-view',
  templateUrl: './responsibility-view.component.html',
  styleUrls: ['./responsibility-view.component.scss']
})
export class ResponsibilityViewComponent implements OnInit {
  addWebAccessFormGroup: FormGroup;
  screenViews: any[];
  views: ViewModel;
  @Input() responsibility: ResponsibilityModel;

  constructor(private settingsService: SettingsService, private dialog: MatDialog, private modalService: ModalService,
              private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.getAllScreens();
  }

  addView() {
    const dialogConfig = this.modalService.setDialogConfig(true, true, '780px', this.views);
    this.dialog.open(ViewsComponent, dialogConfig, )
      .afterClosed().subscribe(data => {
      if (data) {
        this.settingsService.createRespView(data, +this.responsibility.id).subscribe(data => {

          this.getAllScreens();
        });
      }

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
  private getAllScreens() {
    this.settingsService.getAllViewsByRepId(this.responsibility.id)
      .subscribe((data) => {
        this.screenViews = data;
      });
  }

  updateEmployeeWebAccess(module: ResponsibilityViewModel) {
      this.settingsService.updateRespViewPermissions(module).subscribe(data=>console.log(data))

  }

  deleteViewAssociation(view: ViewModel) {
    const confirm = { question: `Are you sure to delete the view association: `, alternativeText: view.viewsDetails.name, yes: 'Delete', no: 'Cancel' };
    const dialogConfig = this.modalService.setDialogConfig(true, false, '780px', confirm);
    this.dialog.open(ConfirmModalComponent, dialogConfig)
      .afterClosed().subscribe(flag => {
      if (flag) {
        this.settingsService.deleteViewAssociation(view.id).subscribe(data=>this.getAllScreens());
      }
    });
  }






}
