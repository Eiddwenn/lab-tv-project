import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MediaDetailsService {


  constructor(protected domSanitizer: DomSanitizer, private http: HttpClient) { }

  sanitizeUrl = (key: string) => {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${key}`)
  }

  getTrailer = (id:any) => {
    return this.http.get(`${environment.movieUrl}/${id}/videos?api_key=${environment.movieApiKey}&language=en-US`)
  }

  getDetails = (id:any) => {
    return this.http.get(`${environment.movieUrl}/${id}?api_key=${environment.movieApiKey}&append_to_response=credits`)
  }
}
