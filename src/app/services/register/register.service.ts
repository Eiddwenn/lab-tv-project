import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/users'

  $token = new Subject

  register = (body: any) => {
    console.log(this.http.post(this.url, body));
    
    return this.http.post<User[]>(this.url, body, this.httpOptions).subscribe({
      next: (data: any) => {
        this.$token = data.accessToken
        console.log(this.$token);
        
      }
    })
  }

  httpOptions: any ={
    headers : new HttpHeaders(
      `{'Authorization' 'Bearer ${this.$token}'}`
    )
  }

  // const headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${$token}`
  // })
  // sign = (user: any) => {
  //   return this.http.post(this.url, user, this.httpOptions)
  // }

 

  getLoggedInUser(user:any): Observable<any> {

    return this.http.get(this.url, user)
  }

}
