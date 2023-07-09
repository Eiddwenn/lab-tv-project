import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Media } from 'src/app/models/media';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }
  
  public nowPlaying?: Array<Media> = []
  public popular?: Array<Media> = []
  public topRated?: Array<Media> = []
  public upcoming?: Array<Media> = []

  urlNp = `${environment.movieUrl}/${environment.nowPlaying}?api_key=${environment.movieApiKey}`

  urlP = `${environment.movieUrl}/${environment.popular}?api_key=${environment.movieApiKey}`

  urlTr = `${environment.movieUrl}/${environment.topRated}?api_key=${environment.movieApiKey}`

  urlU = `${environment.movieUrl}/${environment.upcoming}?api_key=${environment.movieApiKey}`


  getMediaNowPlaying = () => {
    return this.http.get(this.urlNp)
  }
  getMediaPopular = () => {
    return this.http.get(this.urlP)
  }
  getMediaTopRated = () => {
    return this.http.get(this.urlTr)
  }
  getMediaUpcoming = () => {
    return this.http.get(this.urlU)
  }
}
