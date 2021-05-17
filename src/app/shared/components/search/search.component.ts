import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() onSearch = new EventEmitter<string>();
  @Output() resetFilter = new EventEmitter<boolean>();
  searchControl = new FormControl();
  searchValue = '';

  applyFilter(event): void {
    this.searchValue = event.target.value.trim().toLowerCase();
    this.onSearch.emit(this.searchValue);
  }

  resetFilters(): void {
    this.searchControl.reset();
    this.searchValue = '';
    this.resetFilter.emit(true);
  }
}
