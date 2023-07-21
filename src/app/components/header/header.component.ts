import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SearchBarService } from 'src/app/services/search-bar/search-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(private searchService: SearchBarService, private router: Router, private authService: AuthService){}

  isAuthenticated: boolean;

  ngOnInit(): void {
    this.isLoggedIn();
  }

  @Input() movie: any

  activeClass:boolean = false;

  isMenuOpen: boolean = false

  toggleMenu = () => {
    this.isMenuOpen = !this.isMenuOpen
  }

  goToSearch = () => {
    this.router.navigateByUrl('/media-finder')
  }

  showMenu = () => {
    this.activeClass = !this.activeClass
  }

  isLoggedIn = () => {
    this.isAuthenticated = this.authService.isLoggedIn();
  }

  logout = () => {
    localStorage.removeItem('user')
    this.router.navigate(['login']).then(() => {
      window.location.reload()
    })
  }
}
