import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LanguageService, Language } from '../../services/language.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatButton,
    MatMenuModule,
    MatIconModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'ru';
  languages: Language[] = [];
  translations: any = {};
  private languageSubscription?: Subscription;

  constructor(
    private languageService: LanguageService,
    private translationService: TranslationService
  ) {
    this.languages = this.languageService.languages;
  }

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

  private loadTranslations(language: string): void {
    this.translationService.loadTranslations(language).subscribe(translations => {
      this.translations = translations;
    });
  }

  setLanguage(languageCode: string): void {
    this.languageService.setLanguage(languageCode);
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key, this.currentLanguage);
  }

  getCurrentLanguageInfo(): Language | undefined {
    return this.languageService.getLanguageByCode(this.currentLanguage);
  }
}
