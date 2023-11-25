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

  page: number = 1;
  searchValue: string = '';
  showButton: boolean = false;

  onSearch = (value: string) => {
    this.searchService.searchMovie(value, this.page).subscribe({
      next: (data: any) => {
        if(value){
          this.searchValue = value
          this.searchService.moviesResults = data.results;
          this.showButton = true;
        } else {
          this.searchService.moviesResults = []
          this.showButton = false;
        }
      }
    })
  }

  load = () => {
    this.page++
    this.showMore(this.page)
  }

  showMore = (page: number) => {
    this.searchService.searchMovie(this.searchValue, page).subscribe({
      next: (data: any) => {
        this.searchService.moviesResults = this.searchService.moviesResults?.concat(data.results);
      }
    })
  }

}
