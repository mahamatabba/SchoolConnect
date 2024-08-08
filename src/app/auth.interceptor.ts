import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('token');
    console.log('Jeton d\'authentification:', authToken);

    if (authToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });

      return next.handle(cloned).pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {
              console.log('Réponse du serveur:', event);
            }
          },
          error => {
            console.error('Erreur de requête:', error);
          }
        )
      );
    } else {
      console.warn('Aucun jeton d\'authentification trouvé, envoi de la requête sans jeton.');
      return next.handle(req);
    }
  }

}
