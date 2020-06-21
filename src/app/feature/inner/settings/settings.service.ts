import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScreenAPI } from '@shared/api-end-points/screen-api-endpoint';
import { Observable } from 'rxjs';
import { ScreenViewGroup } from './models/screen-view-group.model';
import { ScreenView } from './models/screen-view.model';
import { ServiceAPI } from '@shared/api-end-points/service-api-endpoint';
import { Services } from './models/services.model';
import { Lov } from '@shared/models/lov-model';
import { LOVAPI } from '@shared/api-end-points/lov-api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllScreens(): Observable<ScreenViewGroup[]> {
    return this.http.get<ScreenViewGroup[]>(ScreenAPI.getAllScreensUrl());
  }
  getAllServices(): Observable<Services[]> {
    return this.http.get<Services[]>(ServiceAPI.getAllServicesUrl());
  }

  createScreen(screenView: ScreenView): Observable<ScreenView> {
    return this.http.post<ScreenView>(ScreenAPI.createScreenViewUrl(), screenView);
  }

  createService(service: Services): Observable<Services> {
    return this.http.post<Services>(ServiceAPI.createServiceURL(), service);
  }

  updateService(service: Services, serviceId: number): Observable<Services> {
    return this.http.put<Services>(ServiceAPI.updateServiceURL(serviceId), service);
  }
  getListofValues(): Observable<Lov[]> {
    return this.http.get<Lov[]>(LOVAPI.getAlllovUrl());
  }
  insertListOfValues(lov: Lov): Observable<Lov> {
    return this.http.post<Lov>(LOVAPI.createLovUrl(), lov);
  }
  updateListOfValue(lov: Lov, lovId: number): Observable<Lov> {
    return this.http.put<Lov>(LOVAPI.updateLovUrl(lovId), lov);
  }
}
