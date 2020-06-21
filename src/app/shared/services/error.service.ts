import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    /* Declaring Observables*/
    private somethingWentWrong = new Subject<boolean>();
    somethingWentWrong$ = this.somethingWentWrong.asObservable();

    constructor() {
        this.somethingWentWrong.next(false);
    }

    /* Public Methods */
    handleError = (error: any) => {

        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead

        throw error;
    }

    showSomeThingWentWrongMessage() {
        this.somethingWentWrong.next(true);
    }

    hideSomeThingWentWrongMessage() {
        this.somethingWentWrong.next(false);
    }
}
