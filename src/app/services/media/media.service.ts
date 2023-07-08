import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }
  
  nowPlaying: string = 'now_playing'

  url = `${environment.movieUrl}/${this.nowPlaying}?api_key=${environment.movieApiKey}`


  getMedia = () => {
    return this.http.get(this.url)
  }
}
