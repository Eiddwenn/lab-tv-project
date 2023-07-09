import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  searchValue: string = ''
  
  @Output() searchEmit = new EventEmitter<string>()

  search = () => {
    this.searchEmit.emit(this.searchValue)
  }

}
