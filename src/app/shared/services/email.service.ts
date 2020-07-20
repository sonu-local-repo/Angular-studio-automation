import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Email } from '@shared/models/emai.model';

@Injectable({
    providedIn: 'root'
})

export class EmailService {
    constructor(
        private apiService: ApiService
    ) {}
    sendEmail(email: Email) {
        return this.apiService.post('/email/sendEmail', email);
    }
}
