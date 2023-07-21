import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Media } from 'src/app/models/media';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  constructor(private http: HttpClient) { }

  moviesResults: Array<Media> = []
  
  urlSearchMovie = `${environment.searchUrl}?api_key=${environment.movieApiKey}`

  searchMovie = (query?: string | any, page?: number) => {
    return this.http.get(`${this.urlSearchMovie}&query=${query}&page=${page}`)
  }
}
