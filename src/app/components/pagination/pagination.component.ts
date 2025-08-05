import { Component, Output, EventEmitter, Input } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import { LanguageService } from '../../services/language.service';
import { TranslationService } from '../../services/translation.service';
import { BaseTranslationComponent } from '../../shared/base-translation.component';

@Component({
  selector: 'app-pagination',
  imports: [
    MatIcon
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent extends BaseTranslationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;

  @Output() pageChange = new EventEmitter<number>();

  constructor(
    languageService: LanguageService,
    translationService: TranslationService
  ) {
    super(languageService, translationService);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }
}
