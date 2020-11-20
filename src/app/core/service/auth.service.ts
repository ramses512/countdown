import { Token } from './../interfaces/token';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@data/service/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject: BehaviorSubject<any>;
  public tokenObs: Observable<any>;

  constructor(private apiService: ApiService, private router: Router) {
    this.tokenSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('token') || '{}')
    );
    this.tokenObs = this.tokenSubject.asObservable();
  }

  public get getToken(): any {
    return this.tokenSubject.value;
  }

  public login(credentials): Observable<Token> {
    return this.apiService.post('/login', credentials).pipe(
      tap((res) => {
        if (res.token) {
          this.tokenSubject.next(res.token);
          localStorage.setItem('token', JSON.stringify(res.token));
          localStorage.setItem('userId', JSON.stringify(res.id));
          this.router.navigate(['/countdown']);
        }
      })
    );
  }
  public logout(): void {
    const id = localStorage.getItem('userId');
    this.apiService.put(`/user/${id}`).subscribe()
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.tokenSubject.next(null);
    this.tokenSubject.complete();
    this.router.navigate(['/login']);

  }
}
