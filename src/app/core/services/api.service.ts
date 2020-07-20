import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


// import { JwtService } from './jwt.service';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private envUrl = environment.API_URL;
  constructor(
    private http: HttpClient,
    // private jwtService: JwtService
  ) { }

  private setHeaders(): HttpHeaders {
    const token = localStorage.getItem(':jwt');
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    };

    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    return throwError(error);
  }

  get(path: string, parameters: HttpParams = new HttpParams(), overrideURL?: string): Observable<HttpResponse<any>> {
    let envUrl = environment.API_URL;
    if (overrideURL != null) {
      envUrl = overrideURL;
    }

    return this.http.get(`${envUrl}${path}`, { headers: this.setHeaders(), params: parameters, observe: 'response' })
      .pipe(
        catchError(this.formatErrors),
        map(data => {
          return data as HttpResponse<any>;
        })
      );
  }
  put(path: string, body: any = {}): Observable<any> {
    return this.http.put(
      `${environment.API_URL}${path}`,
      JSON.stringify(body), { headers: this.setHeaders() }
    )
      .pipe(
        catchError(this.formatErrors),
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  // tslint:disable-next-line:ban-types
  post(path: string, body: any = {}, overrideURL?: string): Observable<any> {
    console.log(JSON.stringify(body));
    if (overrideURL != null) {
      this.envUrl = overrideURL;
    }
    return this.http.post(
      `${this.envUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .pipe(
        catchError(this.formatErrors),
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }
  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.API_URL}${path}`,
      { headers: this.setHeaders() }
    )
      .pipe(
        catchError(this.formatErrors),
        map((res: Response) => {
          res.json();
        })
      );
  }
}
