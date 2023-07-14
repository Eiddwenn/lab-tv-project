import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoggedUser, LoginDto, RegisterDto, User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/'

  $token = new Subject

  register = (user: RegisterDto): Observable<LoggedUser> => {
    return this.http.post<LoggedUser>(this.url + "users", user)
  }

  login = (user: LoginDto): Observable<LoggedUser> => {
    return this.http.post<LoggedUser>(this.url + "login", user)
  }

  setLoggedUser = (user: LoggedUser) => {
    localStorage.setItem('user', JSON.stringify(user))
  }

  getLoggedUser = (): LoggedUser | null => {
    const userStorage = localStorage.getItem("user")
    if(userStorage) {
      return JSON.parse(userStorage) as LoggedUser
    }

    return null
  }



  
}
