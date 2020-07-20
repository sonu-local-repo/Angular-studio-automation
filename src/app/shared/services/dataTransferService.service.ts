import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataTransferService {

    private dataSub = new BehaviorSubject<any>([]);
    getData = this.dataSub.asObservable();
    send(data) {
        this.dataSub.next(data);
    }
}
