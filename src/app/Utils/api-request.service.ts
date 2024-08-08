import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private http: HttpClient) { }

  private createHeaders(): HttpHeaders {

    const authToken = localStorage.getItem('auth_token');
    let headers = new HttpHeaders();

    if (authToken) {
      headers = headers.set('Authorization', `Bearer ${authToken}`);
    }

    return headers;
  }

  post<T>(endpoint: string, body: Object, params?: HttpParams): Observable<T> {
    const url = `${environment.apiUrl}/${endpoint}`;
    const headers = this.createHeaders();

    return this.http.post<T>(url, body, { headers, params });
  }

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const url = `${environment.apiUrl}/${endpoint}`;
    const headers = this.createHeaders();

    return this.http.get<T>(url, { headers, params });
  }

  put<T>(endpoint: string, body: Object, params?: HttpParams): Observable<T> {
    const url = `${environment.apiUrl}/${endpoint}`;
    const headers = this.createHeaders();

    return this.http.put<T>(url, body, { headers, params });
  }

  delete<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const url = `${environment.apiUrl}/${endpoint}`;
    const headers = this.createHeaders();

    return this.http.delete<T>(url, { headers, params });
  }
}
