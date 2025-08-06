import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: { [key: string]: any } = {};

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  loadTranslations(language: string): Observable<any> {
    // console.log(`Loading translations for language: ${language}`);

    // Если не браузер, возвращаем пустой объект
    if (!isPlatformBrowser(this.platformId)) {
      // console.log('Not in browser, returning empty translations');
      return of({});
    }

    const url = `/assets/i18n/${language}.json`;
    // console.log(`Requesting translations from: ${url}`);

    return this.http.get(url).pipe(
      tap((translations: any) => {
        // console.log(`Successfully loaded translations for ${language}:`, translations);
      }),
      map((translations: any) => {
        this.translations[language] = translations;
        return translations;
      }),
      catchError((error) => {
        // console.error(`Failed to load translations for ${language}:`, error);
        // console.log('Trying fallback to English translations...');

        // Возвращаем английский как fallback
        return this.http.get('/assets/i18n/en.json').pipe(
          tap((fallbackTranslations: any) => {
            // console.log('Successfully loaded fallback translations:', fallbackTranslations);
          }),
          map((fallbackTranslations: any) => {
            this.translations[language] = fallbackTranslations;
            return fallbackTranslations;
          }),
          catchError((fallbackError) => {
            // console.error('Failed to load fallback translations:', fallbackError);
            return of({});
          })
        );
      })
    );
  }

  getTranslation(key: string, language: string): string {
    const keys = key.split('.');
    let translation = this.translations[language];

    if (!translation) {
      return key;
    }

    for (const k of keys) {
      if (translation && translation[k] !== undefined) {
        translation = translation[k];
      } else {
        // console.warn(`Translation key not found: ${key} in language: ${language}`);
        return key;
      }
    }

    return translation || key;
  }

  getCurrentTranslations(language: string): any {
    return this.translations[language] || {};
  }
}
