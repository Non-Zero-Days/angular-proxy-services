import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  constructor(private http: HttpClient) { }

  getMotD() : Observable<string> {
    let url = 'http://localhost:5000/api/NonZero/motd';
    return this.http.get(url, {responseType: 'text'});
  }
}
