import { Component, Input } from '@angular/core';
import { PostCardComponent } from '../post-card/post-card.component';
import { NgForOf } from '@angular/common';
import { Post } from '../../services/posts.service';
import { LanguageService } from '../../services/language.service';
import { TranslationService } from '../../services/translation.service';
import { BaseTranslationComponent } from '../../shared/base-translation.component';
import { TranslationPipe } from '../../shared/translation.pipe';

@Component({
  selector: 'app-news-cards',
  imports: [
    PostCardComponent,
    TranslationPipe
  ],
  templateUrl: './news-cards.component.html',
  styleUrl: './news-cards.component.css'
})
export class NewsCardsComponent extends BaseTranslationComponent {
  @Input() posts: Post[] = [];

  constructor(
    languageService: LanguageService,
    translationService: TranslationService
  ) {
    super(languageService, translationService);
  }

  // Если нет постов, показываем пустой массив
  get displayPosts() {
    return this.posts || [];
  }
}
