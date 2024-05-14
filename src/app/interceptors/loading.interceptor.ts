// src/app/interceptors/loading.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoadingSpinnerService } from '../services/loading-spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingSpinnerService: LoadingSpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Show spinner on start of request
    this.loadingSpinnerService.show();

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log('HTTP Request successful:', event);
          }
          if (event instanceof HttpErrorResponse) {
            console.log('HTTP Request Error:', event);
          }
        },
        error => {
          console.error('HTTP Error:', error);
        }
      ),
      finalize(() => {
        // Hide spinner when response is received
        this.loadingSpinnerService.hide();
      })
    );
  }
}
