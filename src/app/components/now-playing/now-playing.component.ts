import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Details } from 'src/app/models/media-details';
import { MediaService } from 'src/app/services/media/media.service';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit{

  constructor(public mediaService: MediaService, private router: Router){}

  responsiveOptions: any[] | undefined;

  ngOnInit(): void {
    this.getNowPlaying()

    this.responsiveOptions = [
      {
          breakpoint: '1540px',
          numVisible: 5,
          numScroll: 1
      },
      {
          breakpoint: '1199px',
          numVisible: 4,
          numScroll: 1
      },
      {
          breakpoint: '950px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '700px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  getNowPlaying = () => {
    this.mediaService.getMediaNowPlaying().subscribe({
      next: (data:any) => {
        this.mediaService.nowPlaying = data.results
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

}
