import { FormControl, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';
import { AuthService } from '@app/service/auth.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authService: AuthService;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        SharedModule,
        RouterTestingModule,
      ],
      providers: [AuthService],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call login method', () => {
    const authServiceSpy = spyOn(authService, 'login').and.callThrough();
    const componentSpy = spyOn(component, 'login').and.callThrough();

    component.login();

    expect(authServiceSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledTimes(1);
  });
  it('should  call f method and return controls of login form', () => {
    component.loginForm = new FormGroup({
      test: new FormControl(),
    });
    const controls = component.f();
    expect(controls).toBe(component.loginForm.controls);
  });
});
