import { AppModule } from './../../app.module';
import { ApiService } from '@data/service/api.service';
import { JwtInterceptor } from './jwt.interceptor';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '@env';
import { AuthService } from '@app/service/auth.service';

describe('JwtInterceptor', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let mockAuthService = { getToken: undefined };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule],
      providers: [
        ApiService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true,
        },
        { provide: AuthService, useValue: mockAuthService },
      ],
    });

    service = TestBed.inject(ApiService);
    mockAuthService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => httpMock.verify());
  it('should add an Authorization header', () => {
    mockAuthService.getToken = { accessToken: 'test' };
    service.get('/transactions').subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/transactions`);
    expect(req.request.headers.has('Authorization')).toEqual(true);
    req.flush({});
  });
  it('should not add an Authorization header', () => {
    mockAuthService.getToken = {};
    service.get('/transactions').subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/transactions`);
    expect(req.request.headers.has('Authorization')).toEqual(false);
    req.flush({});
  });
});
