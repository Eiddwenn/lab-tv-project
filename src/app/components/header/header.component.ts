import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBarService } from 'src/app/services/search-bar/search-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private searchService: SearchBarService, private router: Router){}

  @Input() movie: any

  isMenuOpen: boolean = false

  toggleMenu = () => {
    this.isMenuOpen = !this.isMenuOpen
  }

  goToSearch = () => {
    this.router.navigateByUrl('/media-finder')
  }

}
