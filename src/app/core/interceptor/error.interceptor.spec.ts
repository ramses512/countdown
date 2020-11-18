import { AppModule } from './../../app.module';
import { CustomSnackbarService } from './../service/custom-snackbar.service';
import { AuthService } from '@app/service/auth.service';
import { ErrorInterceptor } from './error.interceptor';
import { ApiService } from '@data/service/api.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '@env';

describe('ErrorInterceptor', () => {
  let errorInterceptor: ErrorInterceptor;
  let apiService: ApiService;
  let httpMock: HttpTestingController;
  let mockAuthService = { getToken: undefined };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule],
      providers: [
        ErrorInterceptor,
        CustomSnackbarService,

        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    });
    apiService = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    mockAuthService = TestBed.inject(AuthService);
    errorInterceptor = TestBed.inject(ErrorInterceptor);
  });
  afterEach(() => httpMock.verify());

  it('Should get error 401', () => {
    mockAuthService.getToken = {};

    apiService.get('/transactions').subscribe(
      (res) => fail('should have failed with the 401 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(401);
        expect(error.statusText).toContain('Username or password not valid');
      }
    );

    const req = httpMock.expectOne(`${environment.apiUrl}/transactions`);

    req.flush(new HttpErrorResponse({}), {
      status: 401,
      statusText: 'Username or password not valid',
    });
  });
  it('Should get error 0', () => {
    mockAuthService.getToken = {};

    apiService.get('/transactions').subscribe(
      (res) => fail('should have failed with the 401 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(0);
      }
    );

    const req = httpMock.expectOne(`${environment.apiUrl}/transactions`);

    req.flush(new HttpErrorResponse({}), {
      status: 0,
      statusText: 'test',
    });
  });
  it('Should get error 500', () => {
    mockAuthService.getToken = {};

    apiService.get('/transactions').subscribe(
      (res) => fail('should have failed with the 500 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500);
        expect(error.statusText).toEqual('Internal Server Error');
      }
    );

    const req = httpMock.expectOne(`${environment.apiUrl}/transactions`);

    req.flush(new HttpErrorResponse({}), {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
  it('Should get error 404', () => {
    mockAuthService.getToken = {};

    apiService.get('/transactions').subscribe(
      (res) => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.statusText).toEqual('Resource not found');
      }
    );

    const req = httpMock.expectOne(`${environment.apiUrl}/transactions`);

    req.flush(new HttpErrorResponse({}), {
      status: 404,
      statusText: 'Resource not found',
    });
  });
  it('Should get error by default', () => {
    mockAuthService.getToken = {};

    apiService.get('/transactions').subscribe(
      (res) => fail('should have failed with the 405 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(405);
        expect(error.statusText).toEqual('Method not allowed');
      }
    );

    const req = httpMock.expectOne(`${environment.apiUrl}/transactions`);

    req.flush(new HttpErrorResponse({}), {
      status: 405,
      statusText: 'Method not allowed',
    });
  });
});
