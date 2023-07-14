import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Media } from 'src/app/models/media';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Details } from 'src/app/models/media-details';

@Injectable({
  providedIn: 'root'
})
export class BuyMedia {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  private url = 'http://localhost:3000/'

  getMedia = (): Observable<Media[]> => {
    return this.http.get<Media[]>(this.url + 'buyed-movies')
  }

  postMedia = (movie: Details): Observable<Details[]> => {
    const loggedUser = this.authService.getLoggedUser()
    // console.log(loggedUser);
    
    
    if(loggedUser) {
      
      return this.http.post<Details[]>(this.url + 'buyed-movies', movie)
    }
    this.router.navigate(['/login'])
    return of([])
  } 
}
