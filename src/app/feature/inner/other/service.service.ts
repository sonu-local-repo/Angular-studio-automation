import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceAPI } from '@shared/api-end-points/service-api-endpoint';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Service } from './models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private services: Service[];

  constructor(
    private http: HttpClient
  ) { }

  /* Public Methods */
  getAllServices(): Observable<Service[]> {
    return this.services
      ? of(this.services)
      : this.http.get<Service[]>(ServiceAPI.getAllServicesUrl())
        .pipe(
          tap((data) => { this.services = data; })
        );
  }
}
