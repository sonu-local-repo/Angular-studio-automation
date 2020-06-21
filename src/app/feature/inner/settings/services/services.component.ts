import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { MatTableDataSource } from '@angular/material/table';
import { Services } from '../models/services.model';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { ServicesDialogComponent } from '../services-dialog/services-dialog.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  listOfServices: MatTableDataSource<Services> = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'name', 'type', 'status'];
  @Input() type: string;

  servicesList = [];
  treeControl = new NestedTreeControl<Services>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Services>();
  panelOpenState = false;

  constructor(
    private settingsService: SettingsService,
    private matDialog: MatDialog) { }
  hasNestedChild = (_: number, node: Services) => !!node.children && node.children.length > 0;
  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    this.settingsService.getAllServices().subscribe(data => {
      this.listOfServices.data = data;
      this.servicesList = restructreDate(data, 'Parent');
      this.dataSource.data = this.servicesList;
      function restructreDate(services, parent) {
        const tree = [];
        const length = services.length;
        for (let i = 0; i < length; i++) {
          if (services[i].type === parent) {
            const child = restructreDate(services, services[i].name);
            services[i].children = child;
            tree.push(services[i]);
          }
        }
        return tree;
      }
    });

  }

  addServiceItem(item: Services, $event: Event) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.disableClose = true;
    const element = event.target as HTMLInputElement;
    const action = element.id === 'addServiceItem' ? 'Add' : 'Edit';
    matDialogConfig.data = {
      data: item,
      mode: action
    };
    const dialogRef = this.matDialog.open(ServicesDialogComponent, matDialogConfig);
    event.preventDefault();
    event.stopPropagation();
    dialogRef.afterClosed().subscribe(data => {
      this.ngOnInit();
    });
  }
}
