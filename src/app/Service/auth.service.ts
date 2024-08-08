import { Injectable } from '@angular/core';
import { ApiRequestService } from '../Utils/api-request.service';
import { ILoginResponse } from '../Interface/ILoginResponse';
import { Observable, tap } from 'rxjs';
import { ILogin } from '../Interface/ILogin';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth_token';

  constructor(private apiRequest: ApiRequestService) { }

  login(loginData: ILogin): Observable<ILoginResponse> {
    return this.apiRequest.post<ILoginResponse>('api/Auth/login', loginData)
      .pipe(tap(res => this.setSession(res.token)));
  }

  private setSession(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token); // Utilisation correcte de jwtDecode
      return decoded.Discriminator;
    } catch (error) {
      console.error('Erreur de décodage du token:', error);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
