import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomSnackbarService } from '../service/custom-snackbar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private customSnackbarService: CustomSnackbarService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((exception) => {
        if (exception.status === 0) {
          return throwError(exception);
        }
        const status = exception.status || exception.error.status;
        this.customSnackbarService.open(
          this.getErrorMessage(status, exception),
          'Error',
          'error'
        );
        return throwError(exception);
      })
    );
  }
  private getErrorMessage(status: number, exception: any): string {
    const errorMessage = {
      500: () => {
        return 'Internal Server Error';
      },
      404: () => {
        return 'Resource not found';
      },
      401: () => {
        return 'Username or password not valid';
      },
      default: () => {
        return (
          exception.error.message || exception.error.errors[0].defaultMessage
        );
      },
    };
    return (errorMessage[status] || errorMessage.default)();
  }
}
