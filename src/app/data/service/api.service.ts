import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   *
   *
   * @param {string} path
   * @param {HttpParams} [params=new HttpParams()]
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  public get(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http.get(`${path}`, { params });
  }

  /**
   *
   *
   * @param {string} path
   * @param {Object} [body={}]
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  public post(path: string, body: object = {}): Observable<any> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post(
      `${path}`,
      JSON.stringify(body),
      options
    );
  }
   /**
   *
   *
   * @param {string} path
   * @param {Object} [body={}]
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  public put(path: string, body: Object = {}): Observable<any> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.http.put(
      `${path}`,
      JSON.stringify(body),
      options
    );
    /* .pipe(catchError(this.formatErrors)); */
  }
}
