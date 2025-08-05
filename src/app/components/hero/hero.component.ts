import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { TranslationService } from '../../services/translation.service';
import { BaseTranslationComponent } from '../../shared/base-translation.component';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent extends BaseTranslationComponent {
  constructor(
    languageService: LanguageService,
    translationService: TranslationService
  ) {
    super(languageService, translationService);
  }
}
