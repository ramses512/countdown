import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    console.log(request);
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(handleRoute)).pipe(delay(500));

    function handleRoute() {
      switch (true) {
        case url.endsWith('/login') && method === 'POST':
          return authenticate();
        case url.match(/\/user\/\d+$/) && method === 'GET':
          return getUserById();
        case url.match(/\/user\/\d+$/) && method === 'PUT':
          return updateUser();
        default:
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      let users = [
        {
          id: 1,
          email: 'test@gmail.com',
          password: 'test',
          lastLogin: '',
          token: 'fake-jwt-token',
        },
        {
          id: 2,
          email: 'test2@gmail.com',
          password: 'test2',
          lastLogin: '',
          token: 'fake-jwt-token',
        },
      ];
      if(!localStorage.getItem('users')){
        localStorage.setItem('users', JSON.stringify(users));
      }else{
        users = JSON.parse(localStorage.getItem('users'));
      }
      const { email, password } = JSON.parse(body);
      const user = users.find(
        (x) => x.email === email && x.password === password
      );
      if (!user) return error('Email or password is incorrect');
      return ok({
        id: user.id,
        email: user.email,
        lastLogin: user.lastLogin,
        token: 'fake-jwt-token',
      });
    }

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
    function getUserById() {
      if (!isLoggedIn()) return unauthorized();

      const user = users.find((x) => x.id == idFromUrl());
      return ok(user);
    }
    function updateUser() {
      if (!isLoggedIn()) return unauthorized();
      const foundIndex = users.findIndex(x => x.id === idFromUrl());
      users[foundIndex].lastLogin =  new Date();
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
  }
    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
