import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { find } from 'rxjs';
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

  constructor(protected mediaDetailsService: MediaDetailsService, private route: ActivatedRoute, private mediaService: MediaService, private buyMediaService: BuyMedia, private router: Router){}

  videoKey: string = '';
  media?: Details;
  genres?: Array<Genre> = [];
  cast?: Array<Cast> = [];
  director: string;
  similarMedia: Array<Result>;
  responsiveOptions: any[] | undefined;

  trailerError: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe({
      next: params => {
        const id = params['id'];
        this.getMovieDetails(id);
      }
    })

    this.responsiveOptions = [
      {
          breakpoint: '1500px',
          numVisible: 4,
          numScroll: 1
      },
      {
          breakpoint: '1199px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '950px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '700px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  getTrailer = (id: any) => {
    this.mediaDetailsService.getTrailer(id).subscribe({
      next: (data: any) => {
        const officialTrailerVideo = data.results.find((video: any) => video.name === "Official Trailer");
        if (officialTrailerVideo) {
          this.videoKey = officialTrailerVideo.key;
          this.trailerError = false;
        } else {
        const officialTrailerVideo = data.results.find((video: any) => video.name.toLowerCase().includes('trailer'));
          if (officialTrailerVideo && officialTrailerVideo.key) {
            this.videoKey = officialTrailerVideo.key;
            this.trailerError = false;
          } else {
            this.trailerError = true;
          }
        }
      },
      error: err => this.trailerError = true
    })
  }

  getMediaDetails = (id: any) => {
    this.mediaDetailsService.getDetails(id).subscribe({
      next: (data: any) => {
        this.media = data
        const findDirect = data.credits.cast.find((cast: Cast) => cast.known_for_department === 'Directing')
        if(findDirect) {
          this.director = findDirect.name
        }

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

  getMovieDetails = (id: any) => {
    this.mediaService.movieDetails$.subscribe({
      next: (data:any) => {
        if(data) {
          this.media = data;
          this.getMediaDetails(this.media.id);
          this.getTrailer(this.media.id);
          this.toSimilar(this.media.id);
          localStorage.setItem('id', data.id);
        } else {
          const id = localStorage.getItem('id');
          this.getMediaDetails(id);
          this.getTrailer(id);
          this.toSimilar(id);
        }
      }
    })
  }

  toSimilar = (id: any) => {
    this.mediaDetailsService.getSimilarMedia(id).subscribe({
      next: (data: any) => {
        const similarMedia = data.results.map((movie: any) => movie).slice(0, 10)
        if (similarMedia) {
          this.similarMedia = similarMedia
        }
      }
    })
  }
  

  buyMovie = (movie: any) => {
    console.log('movie id', movie.id);
    
    this.buyMediaService.postMedia(movie).subscribe({
      next: (data: any[]) => {
        console.log('movie post', data);
        
      },
      error: err => console.log('errore', err)
      
    })
  }

  backToHome = () => {
    this.router.navigateByUrl('/dashboard')
  }

  goToDetails = (movie: Details) => {
    this.mediaService.movieDetails$.next(movie)
    localStorage.setItem('id', movie.id.toString())
    const id = localStorage.getItem('id')
    this.router.navigate(['media-details', id])
  }


}
