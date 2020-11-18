import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '@data/service/api.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let apiService: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ApiService, AuthService],
    });
    apiService = TestBed.inject(ApiService);
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call login method', () => {
    const apiServiceSpy = spyOn(apiService, 'post').and.callThrough();
    const serviceSpy = spyOn(service, 'login').and.callThrough();
    service.login({ username: 'user', password: 'pass' });

    expect(apiServiceSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });
});
