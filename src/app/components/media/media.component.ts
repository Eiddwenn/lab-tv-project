import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Details } from 'src/app/models/media-details';
import { MediaService } from 'src/app/services/media/media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent {
  constructor(private router: Router, private mediaService: MediaService){}

  @Input() movie?: any 

  goToDetails = (movie: Details) => {
    this.mediaService.movieDetails$.next(movie)
    localStorage.setItem('id', movie.id.toString())
    const id = localStorage.getItem('id')    
    this.router.navigate(['media-details', id])
  }
  

}
