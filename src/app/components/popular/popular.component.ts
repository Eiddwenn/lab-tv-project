import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Details } from 'src/app/models/media-details';
import { MediaService } from 'src/app/services/media/media.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent {

  constructor(public mediaService: MediaService, private router: Router){}

  @Input() movie: Details | undefined = undefined

  @Output() details = new EventEmitter<Details>()


  responsiveOptions: any[] | undefined;

  ngOnInit(): void {
    this.getPopular()


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

  getPopular = () => {
    this.mediaService.getMediaPopular().subscribe({
      next: (data:any) => {
        this.mediaService.popular = data.results
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
