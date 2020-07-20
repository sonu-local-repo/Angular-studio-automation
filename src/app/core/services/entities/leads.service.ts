import { Injectable } from '@angular/core';
import { Leads } from '../../../shared/models/leads.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, tap, delay} from 'rxjs/operators';
// import {SettingsService} from '@core/services/settings.service';
import {ApiService} from '@core/services/api.service';
const LEADS_LIST = [
  {id: '1', name: 'Lead 1' , source: 'HomeAdvisor' , status: 'New', state: 'Open', assignedto: 'Deepak'},
  {id: '2', name: 'Lead 2' , source: 'Yelp' , status: 'Nurturing', state: 'Open', assignedto: 'Deepak'},
  {id: '3', name: 'Lead 3' , source: 'Valpak' , status: 'Nurturing', state: 'Open', assignedto: 'Deepak'},
  {id: '4', name: 'Lead 4' , source: 'Property Manager' , status: 'New', state: 'Open', assignedto: 'Deepak'},
  {id: '5', name: 'Lead 5' , source: 'Unassigned' , status: 'Unqualified', state: 'Closed', assignedto: 'Deepak'},
  {id: '6', name: 'Lead 6' , source: 'Direct Contact' , status: 'Qualified', state: 'Open', assignedto: 'Deepak'},
  {id: '7', name: 'Lead 7' , source: 'Property Manager' , status: 'Unqualified', state: 'Closed', assignedto: 'Deepak'},
  {id: '8', name: 'Lead 8' , source: 'Yelp' , status: 'Qualified', state: 'Open', assignedto: 'Deepak'},
  {id: '9', name: 'Lead 9' , source: 'HomeAdvisor' , status: 'Nurturing', state: 'Open', assignedto: 'Deepak'},
  {id: '10', name: 'Lead 10' , source: 'Property Manager' , status: 'QUalified', state: 'Open', assignedto: 'Deepak'},
  {id: '11', name: 'Lead 11' , source: 'Valpak' , status: 'New', state: 'Open', assignedto: 'Deepak'},
  {id: '12', name: 'Lead 12' , source: 'HomeAdvisor' , status: 'Nurturing', state: 'Open', assignedto: 'Deepak'},
  {id: '13', name: 'Lead 13' , source: 'Valpak' , status: 'New', state: 'Open', assignedto: 'Deepak'},
  {id: '14', name: 'Lead 14' , source: 'Property Manager' , status: 'New', state: 'Open', assignedto: 'Deepak'},
  {id: '15', name: 'Lead 15' , source: 'Yelp' , status: 'New', state: 'Open', assignedto: 'Deepak'},
  {id: '16', name: 'Lead 16' , source: 'HomeAdvisor' , status: 'New', state: 'Open', assignedto: 'Deepak'},
];

const STATS = [
  {
    title: 'New',
    amount: '10',
    progress: {
      value: 50,
    },
    color: 'bg-indigo-500',
  },
  {
    title: 'Open',
    amount: '15',
    progress: {
      value: 70,
    },
    color: 'bg-blue-500',
  },
  {
    title: 'Closed',
    amount: '10',
    progress: {
      value: 80,
    },
    color: 'bg-green-500',
  },
  {
    title: 'Revenue',
    amount: '$20,000',
    progress: {
      value: 40,
    },
    color: 'bg-teal-500',
  },
];

@Injectable({
  providedIn: 'root'
})

export class LeadsService {

  private _jsonURL = 'assets/data/leads.json';
  constructor(
    private http: HttpClient,
    // private settingsService: SettingsService,
    private apiService: ApiService,
    ) {

  }
  getAllStats() {
    return STATS;
  }
  getLeadDetails(leadId: string) {
    const leadObject = LEADS_LIST.filter(l => l.id === leadId)[0];
    return leadObject;
  }
  public getAll(): Observable<HttpResponse<Leads[]>> {
    return this.apiService.get('/leads');
    // return this.http.get<Leads[]>(this.settingsService.getOptions().API_END_POINT + '/leads', {observe: 'response'});
  }
}

