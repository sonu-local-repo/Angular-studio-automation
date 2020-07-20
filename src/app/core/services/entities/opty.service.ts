import { Injectable } from '@angular/core';
import { HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Opportunity } from '@shared/models/opty.model';
import { SearchParams } from '@shared/models/searchParams.model';
@Injectable({
  providedIn: 'root'
})
export class OptyService {
  constructor(
    private apiService: ApiService
  ) { }
  getAllOpty(): Observable<HttpResponse<Opportunity[]>> {
    return this.apiService.get('/omt/opty/all', null);
  }

  getOptySearch(searchParams: SearchParams) {
    let uri = `/omt/opty/page`;
    let searchString = '';
    Object.keys(searchParams).map(key => {
      searchString += `${key}=${encodeURIComponent(searchParams[key])}&`;
    });
    uri = searchString.length > 0 ? uri + '?' + searchString : uri;
    uri = searchString.length > 0 ? uri.substring(0, uri.length - 1) : uri;
    return this.apiService.get(uri);
  }

  createOpty(opty: Opportunity): Observable<Opportunity> {
    return this.apiService.post('/omt/opty/create', opty);
  }

  getOpty(id: number): Observable<HttpResponse<Opportunity>> {
    return this.apiService.get(`/omt/opty/${id}`);
  }
}
