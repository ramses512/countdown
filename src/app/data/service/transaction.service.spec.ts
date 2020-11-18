import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { TestBed } from '@angular/core/testing';

import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let apiService: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, TransactionService],
    });
    apiService = TestBed.inject(ApiService);
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getByDesc method', () => {
    const apiServiceSpy = spyOn(apiService, 'get').and.callThrough();
    const serviceSpy = spyOn(service, 'getByDesc').and.callThrough();

    service.getByDesc('/transactions');

    expect(apiServiceSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });
});
