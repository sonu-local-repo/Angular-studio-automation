import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor() { }

  /* Public Methods */
  /* return true if value is undefined/null; else false */
  isNullOrEmptyObject(obj: object): boolean {
    if (obj === undefined || obj === null) {
      return true;
    }
    return false;
  }

  /* return true if all properties of the object param is undefined/null/empty; else false */
  isAllNullOrEmptyObject(obj: object): boolean {
    for (const key in obj) {
      if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
        return false;
      }
    }
    return true;
  }

  /* return true if string is undefined/null/empty; else false */
  isNullOrEmptyString(val: string): boolean {
    if (val === undefined || val === null || val === '') {
      return true;
    }
    return false;
  }

  /* return empty string if value is undefined/null; else string itself */
  getEmptyIfNull(val: string): string {
    if (val === undefined || val === null) {
      return '';
    }
    return val;
  }

  removeDuplicatesFromObjectList(list, propNme): any {

    /* Removing undefined values */
    list = list.filter((element) => {
      return element !== undefined;
    });

    /* Removing duplicate values */
    return list.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[propNme]).indexOf(obj[propNme]) === pos;
    });
  }

  makeStringArrayToText(content: string[]) {
    return content.filter(Boolean).join(' ');
  }

  removeSpecialCharacters(text: string): string {
    if (!this.isNullOrEmptyString(text)) {
      text = text.replace('-', '').replace('(', '').replace(')', '').replace(' ', '');
    }
    return text;
  }

  deepCopy(data: any): any {
    return JSON.parse(JSON.stringify(data));
  }

  // Accepts the array and key
  groupBy(array, key) {
    // Return the end result
    return array.reduce((result, currentValue) => {

      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  }

  getAcronymFromText(text: string) {
    const matches = text.match(/\b(\w)/g);
    return matches.join('').toUpperCase();
  }

  formatJsonDate(jDate): string {
    const bDate: Date = new Date(jDate);
    return bDate.toISOString().substring(0, 10);  // Ignore time
  }

  isEvenNumber(num: number): boolean {
    return num % 2 === 0;
  }
}
