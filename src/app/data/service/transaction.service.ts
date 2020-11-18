import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '@data/schema/transaction';
import { HttpParams } from '@angular/common/http';
interface Params {
  sort?: string;
  description?: string;
}
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private apiService: ApiService) {}

  public getByDesc(
    path: string,
    params: Params = {}
  ): Observable<Transaction[]> {
    const options = new HttpParams()
      .set('sort', params.sort || '')
      .set('description', params.description || '');

    return this.apiService.get(path, options);
  }
}
