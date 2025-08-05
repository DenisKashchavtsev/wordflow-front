import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { TranslationService } from '../../services/translation.service';
import { BaseTranslationComponent } from '../../shared/base-translation.component';
import { TranslationPipe } from '../../shared/translation.pipe';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink, TranslationPipe, MatButton],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent extends BaseTranslationComponent {
  constructor(
    languageService: LanguageService,
    translationService: TranslationService
  ) {
    super(languageService, translationService);
  }
}
