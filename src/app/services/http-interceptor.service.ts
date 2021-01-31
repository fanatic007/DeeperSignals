import { Injectable } from '@angular/core';
import { HttpRequest,  HttpHandler,  HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private dataService:DataService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!request.url.includes('login')) {
      request = request.clone({
        setHeaders: {
          "X-Token" : localStorage.getItem('userDetails')['token']
        }
      });
    }
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            if(event.url.includes('login')){
              localStorage.setItem("userDetails", event.body );
            }
          }
        }, 
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) { 
              console.log(err);
            }
          }
        }
      )
    );
  }
}