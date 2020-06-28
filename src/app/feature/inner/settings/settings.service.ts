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
import {RESPONSIBILITY_API} from "@shared/api-end-points/responsibilities-api-endpoint";
import {ResponsibilityModel} from "./models/responsibility.model";
import {ApiResponse} from "@shared/models/api-response.model";
import {ViewModel} from "./models/view.model";
import {ResponsibilityViewModel} from "./models/responsibility-view.model";

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
  getResponsibilities():Observable <ApiResponse<ResponsibilityModel[]>>{
    return this.http.get<ApiResponse<ResponsibilityModel[]>>(RESPONSIBILITY_API.getAllResponsibilities())
  }
  createResponsibility(responsibility: ResponsibilityModel): Observable<any>{
    return this.http.post<Observable<any>>(RESPONSIBILITY_API.createResponsibilityUrl(), responsibility)
  }
  getResponsibilityById(id: number): Observable<ResponsibilityModel>{
    return this.http.get<ResponsibilityModel>(RESPONSIBILITY_API.getResponsibilityById(id));
  }
  getAllViews(): Observable<ApiResponse<ViewModel[]>>{
    return this.http.get<ApiResponse<ViewModel[]>>(RESPONSIBILITY_API.getAllViews());
  }
  getAllViewsByRepId(id: number): Observable<any[]>{
    return this.http.get<any[]>(RESPONSIBILITY_API.getAllViewsByRepId(id));
  }
  createRespView(view: ViewModel, respId: number): Observable<any>{
    return this.http.post<any>(RESPONSIBILITY_API.createRespView(respId), view );
  }
  updateRespViewPermissions(viewRespPermission: ResponsibilityViewModel): Observable<any>{
    return this.http.put<any>(RESPONSIBILITY_API.updateResViewPermission(), viewRespPermission)
  }
  createView(view: ViewModel): Observable<ViewModel>{
    return this.http.post<ViewModel>(RESPONSIBILITY_API.createView(), view);
  }

  deleteViewAssociation(id: number) {
    return this.http.delete(RESPONSIBILITY_API.deleteViewAssociation(id))
  }
}
