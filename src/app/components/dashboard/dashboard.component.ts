import { Component } from '@angular/core';
import { Image } from 'src/app/models/image';
import { Media } from 'src/app/models/media';
import { MediaService } from 'src/app/services/media/media.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private mediaService: MediaService){
    this.getMovies()
  }

  movies: Array<Media> = []


  getMovies = () => {
    this.mediaService.getMedia().subscribe({
      next: (data:any) => {
        this.movies = data.results
      },
      error: err => console.log(err)
    })
  }

}
