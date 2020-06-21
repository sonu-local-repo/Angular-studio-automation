import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthAPI } from '@shared/api-end-points/auth-api-endpoint';
import { UserCredentials } from '@shared/models/user-credentials.model';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EmployeeAuthorities } from '../../feature/inner/employee/models/employee-authorities.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;
  private loggedInUser: EmployeeAuthorities;

  /* Declaring Observables*/
  private employeeAuthorities = new ReplaySubject<EmployeeAuthorities>(1);
  employeeAuthorities$ = this.employeeAuthorities.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  validateUser(userCredentials: UserCredentials): Observable<any> {
    return this.http.post<any>(AuthAPI.validateUserUrl(), userCredentials, { reportProgress: true });
  }

  getEmployeeAuthorities(): Observable<EmployeeAuthorities> {
    return this.http.get<EmployeeAuthorities>(AuthAPI.getEmployeeAuthoritiesUrl())
      .pipe(
        tap((data) => {
          this.loggedInUser = data;
          this.employeeAuthorities.next(data);
          this.loggedIn = data && data.employeeId !== 0;
        }));
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getLoggedInUser(): EmployeeAuthorities {
    return this.loggedInUser;
  }

  resetSession(): void {
    localStorage.removeItem(':jwt');
    this.loggedIn = false;
  }
}
