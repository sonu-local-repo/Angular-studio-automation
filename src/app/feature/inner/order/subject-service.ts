import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  // tslint:disable-next-line:variable-name
  private _subject = new Subject();

  moveToTask() {
    this._subject.next();
  }
  get events$() {
    return this._subject.asObservable();
  }


}
