import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../services/language.service';
import { TranslationService } from '../../services/translation.service';
import { BaseTranslationComponent } from '../../shared/base-translation.component';
import { TranslationPipe } from '../../shared/translation.pipe';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatButton,
    MatMenuModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    TranslationPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent extends BaseTranslationComponent {
  languages: Language[] = [];

  constructor(
    languageService: LanguageService,
    translationService: TranslationService
  ) {
    super(languageService, translationService);
    this.languages = this.languageService.languages;
  }

  setLanguage(languageCode: string): void {
    this.languageService.setLanguage(languageCode);
  }

  getCurrentLanguageInfo(): Language | undefined {
    return this.languageService.getLanguageByCode(this.currentLanguage);
  }
}
