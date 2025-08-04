import { Component, Output, EventEmitter } from '@angular/core';
import {NgForOf} from '@angular/common';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-news-filters',
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption
  ],
  templateUrl: './news-filters.component.html',
  styleUrl: './news-filters.component.css'
})
export class NewsFiltersComponent {
  levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  categories = ['All', 'Vocabulary', 'Grammar', 'Business', 'Travel', 'IT', 'Kids', 'Academic', 'Conversation'];

  @Output() filtersChange = new EventEmitter<{level: string, category: string}>();
  selectedLevel = '';
  selectedCategory = '';

  onLevelChange(level: string) {
    this.selectedLevel = level;
    this.emitFilters();
  }
  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.emitFilters();
  }
  emitFilters() {
    this.filtersChange.emit({ level: this.selectedLevel, category: this.selectedCategory });
  }
}
