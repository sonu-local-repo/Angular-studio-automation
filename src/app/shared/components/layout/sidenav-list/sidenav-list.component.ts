import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionService } from '@shared/services/action.service';
import { AuthService } from '@core/services/auth.service';
import { EmployeeAuthorities } from 'app/feature/inner/employee/models/employee-authorities.model';
import { ScreenName } from '@shared/enums/screen-name.enum';
import { PermissionService } from '@core/services/permission.service';
import { HttpClient } from '@angular/common/http';
import { interval, pipe, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { API_URL_DOMAIN } from '@shared/configs/globals';
import { Task } from 'app/feature/inner/tasks/model/task';
import { NavigationGuard } from '@core/services/navigation-guard.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  sideMenuList: any[] = [];
  userName: string;
  designation = '';
  token = localStorage.getItem(':jwt');
  constructor(
    private router: Router,
    private actionService: ActionService,
    private authService: AuthService,
    private permissionService: PermissionService,
    private http: HttpClient,
    private navigationService: NavigationGuard
  ) {
    this.pollOnLoad();
  }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.initVariables();
    this.subscribeEvents();
    this.getTasksByDept();
  }

  /* Private Methods */
  private initVariables() {
    this.sideMenuList = [
      {
        name: 'Orders',
        icon: 'playlist_add',
        url: 'orders',
        isVisible: this.navigationService.canShowMenu('orders'),
        badge: 0
      },
      {
        name: 'Customers',
        icon: 'transfer_within_a_station',
        url: 'customers',
        isVisible: this.navigationService.canShowMenu('customers'),
        badge: 0
      },
      {
        name: 'Employees',
        icon: 'group',
        url: 'employees',
        isVisible: this.navigationService.canShowMenu('employees'),
        // isVisible: this.checkViewAccess(ScreenName.Employee_List),
        badge: 0
      },
      {
        name: 'Pipeline',
        icon: 'menu',
        url: 'pipeline',
        isVisible: this.navigationService.canShowMenu('pipeline'),
        badge: 0
      },
      {
        name: 'Tasks',
        icon: 'alarm',
        isVisible: this.navigationService.canShowMenu('tasks'),
        badge: 0,
        subItems: [
          {
            name: 'All Tasks ',
            icon: 'alarm',
            url: 'tasks',
            isVisible: this.navigationService.canShowMenu('tasks'),
            badge: 0
          },
          {
            name: 'My Tasks',
            icon: 'alarm',
            url: 'tasks/mytask',
            isVisible: this.navigationService.canShowMenu('tasks/mytask'),
            badge: 0
          }
        ]

      },
      {
        name: 'Settings',
        icon: 'build',
        url: 'settings',
        isVisible: this.navigationService.canShowMenu('settings'),
        badge: 0
        // subItems:
        //   [
        //     { name: 'All Employees', icon: 'playlist_add', url: 'employees' },
        //     { name: 'Add Employee', icon: 'playlist_add', url: 'employees/new' }
        //   ]
      },
    ];
  }

  private subscribeEvents() {
    this.authService.employeeAuthorities$.subscribe((data: EmployeeAuthorities) => {
      this.userName = `${data.firstName} ${data.lastName}`;
    });
  }

  private checkViewAccess(screenId: string) {

    return this.permissionService.canView(screenId);
  }

  /* Public Methods */
  isModuleSelected(menu) {
    const arr = menu.url.split('/');
    const moduleName = arr[arr.length - 1];
    return this.router.url.includes(moduleName);
  }

  getAcronym() {
    return this.actionService.getAcronymFromText(this.userName);
  }

  logout() {
    this.router.navigateByUrl('auth/login');
  }

  getTasksByDept() {

    interval(30000)
      .pipe(
        switchMap(() => this.http.get<Task[]>(`${API_URL_DOMAIN}/order-task/department`,
          { headers: { Authorization: `Bearer ${this.token}` } })),
        map((resp: Task[]) => {
          const taskArray = [];
          resp.map((item: Task) => {
            if (item.status === 'In Progress') {
              taskArray.push(item.id);
            }
          });
          return taskArray;
        })
      )
      .subscribe(res => {
        this.sideMenuList.filter((item) => {
          if (item.name === 'Tasks') {
            item.subItems.filter(subItem => {
              item.badge = res.length;
              if (subItem.name === 'All Tasks ') {
                subItem.badge = res.length;
              }
            });
          }
        });
      });
  }

  basicToggle() {

  }

  pollOnLoad() {

    this.http.get<Task[]>(`${API_URL_DOMAIN}/order-task/department`,
      { headers: { Authorization: `Bearer ${this.token}` } }).pipe(
        map((resp: Task[]) => {
          const taskArray = [];
          resp.map((item: Task) => {
            if (item.status === 'In Progress') {
              taskArray.push(item.id);
            }
          });
          return taskArray;
        }))
      .subscribe(res => {
        this.sideMenuList.filter((item) => {
          if (item.name === 'Tasks') {
            item.subItems.filter(subItem => {
              item.badge = res.length;
              if (subItem.name === 'All Tasks ') {
                subItem.badge = res.length;
              }
            });
          }
        });
      });
  }
}
