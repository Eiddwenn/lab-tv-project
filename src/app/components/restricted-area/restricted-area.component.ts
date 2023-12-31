import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/media';
import { Details } from 'src/app/models/media-details';
import { BuyMedia } from 'src/app/services/login/buy-media.service';
import { MediaService } from 'src/app/services/media/media.service';


@Component({
  selector: 'app-restricted-area',
  templateUrl: './restricted-area.component.html',
  styleUrls: ['./restricted-area.component.scss']
})
export class RestrictedAreaComponent implements OnInit{

  constructor(public mediaService: MediaService, private router: Router, private buyMediaService: BuyMedia){}
  
  movie: Movie[]

  ngOnInit(): void {
    this.getBuyedMovies()
  }

  getBuyedMovies = () => {
    this.buyMediaService.getMedia().subscribe({
      next: (data:Movie[]) => {
        console.log(data);
        this.movie = data
      },
      error: err => console.log(err)
    })
  }
  
  // DETAILS

  goToDetails = (movie: Details) => {
    this.mediaService.movieDetails$.next(movie)
    localStorage.setItem('id', movie.id.toString())
    const id = localStorage.getItem('id')    
    this.router.navigate(['media-details', id])
  }

  deleteMovie = (id: number) => {
    this.buyMediaService.removeMovie(id).subscribe({
      next: (data: any) => {
        console.log(id);
        
        this.getBuyedMovies()
      }
    })
  }

}
