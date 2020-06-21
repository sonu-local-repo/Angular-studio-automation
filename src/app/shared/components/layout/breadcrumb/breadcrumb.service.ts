import { Injectable } from '@angular/core';
import { KeyValue } from '@angular/common';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  dynamicData = new Subject<KeyValue<string, string>[]>();
  dynamicData$ = this.dynamicData.asObservable();
  data: KeyValue<string, string>[] = [];

  constructor() { }

  clearDynamicList(key: string, value: string) {
    this.data = [];
    this.dynamicData.next(this.data);
  }

  updateDynamicList(key: string, value: string) {
    this.data = this.data.filter((item) => item.key !== key);
    this.data.push({ key, value });
    this.dynamicData.next(this.data);
  }
}
