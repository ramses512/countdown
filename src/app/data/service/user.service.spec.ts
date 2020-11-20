import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let apiService: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, UserService],
    });
    apiService = TestBed.inject(ApiService);
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
