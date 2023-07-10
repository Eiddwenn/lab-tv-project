import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Details } from 'src/app/models/media-details';
import { MediaService } from 'src/app/services/media/media.service';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss']
})
export class TopRatedComponent {
  constructor(public mediaService: MediaService, private router: Router){}

  responsiveOptions: any[] | undefined;

  ngOnInit(): void {

    this.getTopRated()

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

  // API CALL

  getTopRated = () => {
    this.mediaService.getMediaTopRated().subscribe({
      next: (data:any) => {
        this.mediaService.topRated = data.results
      },
      error: err => console.log(err)
    })
  }

  goToDetails = (movie: Details) => {
    this.mediaService.movieDetails$.next(movie)    
    this.router.navigateByUrl('/media-details')
  }

}