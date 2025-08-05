import { Component, Input } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { TranslationService } from '../../services/translation.service';
import { BaseTranslationComponent } from '../../shared/base-translation.component';

@Component({
  selector: 'app-post-card',
  imports: [
    MatCardActions,
    MatCardContent,
    MatCard,
    NgIf,
    RouterLink
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent extends BaseTranslationComponent {
  @Input() post: any;

  constructor(
    languageService: LanguageService,
    translationService: TranslationService
  ) {
    super(languageService, translationService);
  }
}
