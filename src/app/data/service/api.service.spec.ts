import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Token } from '@app/interfaces/token';
import { Transaction } from '@data/schema/transaction';
import { environment } from '@env';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    apiService = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => httpMock.verify());
  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });
  it('should do get', () => {
    const mockResult: Transaction[] = [
      {
        id: 2857,
        amount: -144.63,
        date: '2019-07-22T13:51:12.000Z',
        description: 'Tempor dolor laboris minim cupidatat duis nisi ad.',
        fee: -4.74,
        userId: 1,
      },
    ];

    apiService.get('/transactions').subscribe((transactions: Transaction[]) => {
      expect(transactions.length).toBe(1);
      expect(transactions[0].id).toBe(2857);
      expect(transactions).toBe(mockResult);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/transactions`);
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('json');
    req.flush(mockResult);
  });
  it('should do post', () => {
    const mockResult: Token = {
      accessToken: 'aaaa',
    };
    apiService.post('/login').subscribe((token: Token) => {
      expect(token).toBe(mockResult);
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.responseType).toBe('json');
    req.flush(mockResult);
  });
});
