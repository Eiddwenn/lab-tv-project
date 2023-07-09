import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent {
  constructor(private router: Router){}

  @Input() movie?: any 

  goToDetails = () => {
    this.router.navigate(['/media-details', this.movie?.id])
  }

}
