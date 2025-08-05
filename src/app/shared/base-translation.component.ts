import { OnInit, OnDestroy, Directive } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';
import { TranslationService } from '../services/translation.service';

@Directive()
export abstract class BaseTranslationComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'ru';
  translations: any = {};
  protected languageSubscription?: Subscription;

  constructor(
    protected languageService: LanguageService,
    protected translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
      this.loadTranslations(language);
    });
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  protected loadTranslations(language: string): void {
    this.translationService.loadTranslations(language).subscribe(translations => {
      this.translations = translations;
    });
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key, this.currentLanguage);
  }
} 