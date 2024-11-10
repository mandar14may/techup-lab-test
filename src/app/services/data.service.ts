import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }
  

  getRegions(): Observable<any> {
    return this.http.get<any>('https://api.first.org/data/v1/countries');
  }

  getCountriesByRegion(region: string): Observable<any> {
    return this.http.get<any>(`https://api.first.org/data/v1/countries?region=${region}`);
  }
}
