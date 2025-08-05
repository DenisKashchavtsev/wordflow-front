import { Directive, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';
import { TranslationService } from '../services/translation.service';

@Directive({
  selector: '[appTranslation]',
  standalone: true
})
export class TranslationDirective implements OnInit, OnDestroy {
  @Input() appTranslation: string = '';
  @Input() translationKey: string = '';
  
  private languageSubscription?: Subscription;
  private currentLanguage: string = 'ru';

  constructor(
    private elementRef: ElementRef,
    private languageService: LanguageService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
      this.updateTranslation();
    });
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  private updateTranslation(): void {
    const key = this.translationKey || this.appTranslation;
    if (key) {
      const translation = this.translationService.getTranslation(key, this.currentLanguage);
      this.elementRef.nativeElement.textContent = translation;
    }
  }
} 