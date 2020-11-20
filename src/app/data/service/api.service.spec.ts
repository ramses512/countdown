import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Token } from '@app/interfaces/token';
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
});
