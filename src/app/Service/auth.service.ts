import { Injectable } from '@angular/core';
import { ApiRequestService } from '../Utils/api-request.service';
import { ILoginResponse } from '../Interface/ILoginResponse';
import { Observable, tap } from 'rxjs';
import { ILogin } from '../Interface/ILogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiRequest: ApiRequestService) { }

  login(loginData: ILogin): Observable<ILoginResponse> {
    return this.apiRequest.post<ILoginResponse>('api/Auth/login', loginData)
      .pipe(tap(res => this.setSession(res.token)));
  }
  private setSession(token: string): void {
    localStorage.setItem('auth_token', token);
  }
}
