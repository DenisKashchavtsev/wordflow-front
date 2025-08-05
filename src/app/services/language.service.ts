import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('ru');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  public readonly languages: Language[] = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    console.log('LanguageService initialized');
    // Загружаем сохраненный язык из localStorage только в браузере
    if (isPlatformBrowser(this.platformId)) {
      const savedLanguage = localStorage.getItem('selectedLanguage');
      console.log('Saved language from localStorage:', savedLanguage);
      if (savedLanguage && this.languages.some(lang => lang.code === savedLanguage)) {
        console.log('Setting saved language:', savedLanguage);
        this.currentLanguageSubject.next(savedLanguage);
      } else {
        console.log('No valid saved language, using default: ru');
      }
    } else {
      console.log('Not in browser, using default language: ru');
    }
  }

  setLanguage(languageCode: string): void {
    console.log('Setting language to:', languageCode);
    if (this.languages.some(lang => lang.code === languageCode)) {
      this.currentLanguageSubject.next(languageCode);
      // Сохраняем в localStorage только в браузере
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('selectedLanguage', languageCode);
        console.log('Language saved to localStorage:', languageCode);
      }
    } else {
      console.warn('Invalid language code:', languageCode);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  getLanguageByCode(code: string): Language | undefined {
    return this.languages.find(lang => lang.code === code);
  }
} 