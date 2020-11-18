import { AuthService } from '@app/service/auth.service';
import { AuthGuard } from '@app/guard/auth.guard';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockAuthService = { getToken: undefined };
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: mockAuthService },
      ],
    });
    guard = TestBed.inject(AuthGuard);
    mockAuthService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if the user isAuthenticated', () => {
    mockAuthService.getToken = { accessToken: 'test' };

    const state: any = {};
    state.url = 'login';

    expect(guard.canActivate(new ActivatedRouteSnapshot(), state as any)).toBe(
      true
    );
  });

  it('should return false if the user is not authenticated and navigate to login', () => {
    mockAuthService.getToken = {};

    const state: any = {};
    state.url = '/transaction';

    expect(guard.canActivate(new ActivatedRouteSnapshot(), state as any)).toBe(
      false
    );
    expect(router.navigate).toHaveBeenCalledWith(['/login'], {
      queryParams: { returnUrl: state.url },
    });
  });
});
