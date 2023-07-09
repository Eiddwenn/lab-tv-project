import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Media } from 'src/app/models/media';
import { MediaService } from 'src/app/services/media/media.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public mediaService: MediaService, private router: Router){}

  responsiveOptions: any[] | undefined;

  ngOnInit(): void {

    this.getPopular()
    this.getTopRated()
    this.getUpcoming()


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
  getTopRated = () => {
    this.mediaService.getMediaTopRated().subscribe({
      next: (data:any) => {
        this.mediaService.topRated = data.results
      },
      error: err => console.log(err)
    })
  }
  getUpcoming = () => {
    this.mediaService.getMediaUpcoming().subscribe({
      next: (data:any) => {
        this.mediaService.upcoming = data.results
      },
      error: err => console.log(err)
    })
  }

  // DETAILS

  @Input() movie?: Media

  goToDetails = () => {
    console.log('id:', this.movie?.id);
    
    this.router.navigate(['/media-details', this.movie?.id])
  }

}
