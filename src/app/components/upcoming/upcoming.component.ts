import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Details } from 'src/app/models/media-details';
import { MediaService } from 'src/app/services/media/media.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent {

  constructor(public mediaService: MediaService, private router: Router){}

  responsiveOptions: any[] | undefined;

  ngOnInit(): void {

    this.getUpcoming()


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


  // API CALL

  getUpcoming = () => {
    this.mediaService.getMediaUpcoming().subscribe({
      next: (data:any) => {
        this.mediaService.upcoming = data.results
      },
      error: err => console.log(err)
    })
  }

  goToDetails = (movie: Details) => {
    this.mediaService.movieDetails$.next(movie)
    localStorage.setItem('id', movie.id.toString())
    const id = localStorage.getItem('id')    
    this.router.navigate(['media-details', id])
  }

}
