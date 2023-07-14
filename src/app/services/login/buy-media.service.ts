import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Media } from 'src/app/models/media';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BuyMedia {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  private url = 'http://localhost:3000/'

  getMedia = (): Observable<Media[]> => {
    return this.http.get<Media[]>(this.url + 'buyed-movies')
  }

  postMedia = (): Observable<Media[]> => {
    const loggedUser = this.authService.getLoggedUser()
    console.log(loggedUser.accessToken);
    
    if(loggedUser) {
      const options = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${loggedUser.accessToken}`
        })
      }
      return this.http.post<Media[]>(this.url + 'buyed-movies', options)
    }
    this.router.navigate(['/login'])
    return of([])
  } 
}
