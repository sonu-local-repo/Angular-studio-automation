import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { SearchParams } from '@shared/models/searchParams.model';

@Injectable({
    providedIn: 'root'
})

export class AccountsService {
    constructor(private apiService: ApiService) { }

    getAllAccounts() {
        return this.apiService.get(`/omt/account/all`);
    }

    getAccount(accountId: number) {
        return this.apiService.get(`/omt/account/${accountId}`);
    }


    getAccounts(searchParams: SearchParams) {
        let uri = `/omt/account/page`;
        let searchString = '';
        Object.keys(searchParams).map(key => {
            if (searchParams[key] !== '') {
                searchString += `${key}=${encodeURIComponent(searchParams[key])}&`;
            }
        });
        uri = searchString.length > 0 ? uri + '?' + searchString : uri;
        uri = searchString.length > 0 ? uri.substring(0, uri.length - 1) : uri;
        return this.apiService.get(uri);
    }

    createAccount(body) {
        return this.apiService.post(`/omt/account/create`, body);
    }
}
