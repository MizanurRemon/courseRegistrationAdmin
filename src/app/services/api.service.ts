import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../model/login.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = "http://localhost:5001/v2/"
  private LOGIN = "admin_login"

  constructor(private http: HttpClient) { }

  adminLogin(username: String, password: String): Observable<LoginResponse> {

    var formData: any = new FormData()
    formData.append('username', username)
    formData.append('password', password)


    return this.http.post<LoginResponse>(this.BASE_URL + this.LOGIN, formData);

  }
}
