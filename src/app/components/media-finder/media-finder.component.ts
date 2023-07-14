import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBarService } from 'src/app/services/search-bar/search-bar.service';

@Component({
  selector: 'app-media-finder',
  templateUrl: './media-finder.component.html',
  styleUrls: ['./media-finder.component.scss']
})
export class MediaFinderComponent {

  constructor(private router: Router, public searchService: SearchBarService){}

  onSearch = (value: string) => {
    this.searchService.searchMovie(value).subscribe({
      next: (data: any) => {
        if(value){
          this.searchService.moviesResults = data.results;
        } else {
          this.searchService.moviesResults = []
        }
      }
    })
  }



}
