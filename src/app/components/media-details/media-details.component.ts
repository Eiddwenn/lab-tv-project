import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Media } from 'src/app/models/media';
import { Cast, Details, Genre } from 'src/app/models/media-details';
import { Result } from 'src/app/models/similar';
import { BuyMedia } from 'src/app/services/login/buy-media.service';
import { MediaDetailsService } from 'src/app/services/media-details/media-details.service';
import { MediaService } from 'src/app/services/media/media.service';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.scss']
})
export class MediaDetailsComponent implements OnInit{

  constructor(protected mediaDetailsService: MediaDetailsService, private route: ActivatedRoute, private mediaService: MediaService, private buyMediaService: BuyMedia){}

  videoKey: string = ''
  media?: Details
  genres?: Array<Genre> = []
  cast?: Array<Cast> = []
  similarMedia: Array<Result>


  ngOnInit(): void {
    // this.route.params.subscribe({
    //   next: params => {
    //   const id = params['id']
    //   this.getTrailer(this.media.id)
    //   this.getMediaDetails(this.media.id)
    // },
    //   error: err => console.log(err)
    // })
    this.getMovieDetails()
  }

  getTrailer = (id: any) => {
    this.mediaDetailsService.getTrailer(id).subscribe({
      next: (data: any) => {
        const officialTrailerVideo = data.results.find((video: any) => video.name === "Official Trailer");
        if (officialTrailerVideo) {
          this.videoKey = officialTrailerVideo.key;
        }
      }
    })
  }

  getMediaDetails = (id: any) => {
    this.mediaDetailsService.getDetails(id).subscribe({
      next: (data: any) => {
        this.media = data
        const findGenre = data.genres.map((genres:Genre) => genres.name)
        if (findGenre) {
          this.genres = findGenre
        }
        const findCast = data.credits.cast.filter((cast:Cast) => cast.known_for_department === 'Acting').slice(0, 10)
        if (findCast) {
          this.cast = findCast
        }
      }
    })
  }

  getMovieDetails = () => {
    this.mediaService.movieDetails$.subscribe({
      next: (data:any) => {
        this.media = data
        this.getMediaDetails(this.media.id)
        this.getTrailer(this.media.id)
        this.toSimilar(this.media.id)
      }
    })
  }

  toSimilar = (id: any) => {
    this.mediaDetailsService.getSimilarMedia(id).subscribe({
      next: (data: any) => {
        const similarMedia = data.results.map((movie: any) => movie).slice(0, 5)
        if (similarMedia) {
          this.similarMedia = similarMedia
        }
      }
    })
  }
  

  buyMovie = (movie: Details) => {
    console.log('movie id', movie.id);
    
    this.buyMediaService.postMedia(movie).subscribe({
      next: (data: Details[]) => {
        console.log('movie post', data);
        
      },
      error: err => console.log('errore', err)
      
    })
  }


}
