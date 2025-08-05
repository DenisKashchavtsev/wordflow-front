import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { TranslationService } from '../../services/translation.service';
import { BaseTranslationComponent } from '../../shared/base-translation.component';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent extends BaseTranslationComponent {
  constructor(
    languageService: LanguageService,
    translationService: TranslationService
  ) {
    super(languageService, translationService);
  }
} 