import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslationPipe implements PipeTransform {
  private currentLanguage: string = 'ru';

  constructor(
    private translationService: TranslationService,
    private languageService: LanguageService
  ) {
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  transform(key: string): string {
    return this.translationService.getTranslation(key, this.currentLanguage);
  }
} 