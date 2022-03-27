import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RequestService {
  constructor(private http: HttpClient) {}
  // Common get  function which will receive API urls returns the API response
  getAll(url: string) {
    return this.http.get(url);
  }
  getById(url: string) {
    return this.http.get(url);
  }
  create(url: string, payload: any) {
    return this.http.post(url, payload);
  }
  update(url: string, payload: any) {
    return this.http.put(url, payload);
  }
  delete(url: string) {
    return this.http.delete(url);
  }
}
