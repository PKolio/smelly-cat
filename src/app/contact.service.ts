import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = '/api/contact';

  constructor(private http: HttpClient) { }

  sendMessage(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
}
