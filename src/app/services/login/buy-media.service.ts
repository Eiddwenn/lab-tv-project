import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Media, Movie } from 'src/app/models/media';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Details } from 'src/app/models/media-details';

@Injectable({
  providedIn: 'root'
})
export class BuyMedia {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  private url = 'http://localhost:3000/'

  getMedia = (): Observable<any> => {
    return this.http.get<any>(this.url + 'buyed-movies')
  }

  postMedia = (movie: any): Observable<any[]> => {
    const loggedUser = this.authService.getLoggedUser()
    const body = {
      title: movie.title,
      backdrop_path: movie.backdrop_path,
      poster_path: movie.poster_path,
      id: movie.id
    }
    
    
    if(loggedUser) {
      
      return this.http.post<Movie[]>(this.url + 'buyed-movies', body)
    }
    this.router.navigate(['/login'])
    return of([])
  } 


  removeMovie = (id: number): Observable<Details> => {
    return this.http.delete<Details>(this.url + 'buyed-movies' + '/' + id)
  }
}
