import { Component, Input } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {NgIf, SlicePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { TranslationService } from '../../services/translation.service';
import { BaseTranslationComponent } from '../../shared/base-translation.component';
import { TranslationPipe } from '../../shared/translation.pipe';
import {environment} from '../../../environments/environment';
import {TruncateAndStripHtmlPipe} from '../../shared/truncate-and-strip-html.pipe';

@Component({
  selector: 'app-post-card',
  imports: [
    MatCardActions,
    MatCardContent,
    MatCard,
    NgIf,
    RouterLink,
    TranslationPipe,
    TruncateAndStripHtmlPipe
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

  protected readonly environment = environment;
}
