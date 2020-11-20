import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@data/schema/user';
interface Params {
  sort?: string;
  description?: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  public getLastLogin(
    path: string,
  ): Observable<User> {

    return this.apiService.get(path);
  }
}
