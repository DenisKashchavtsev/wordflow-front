import { Component } from '@angular/core';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubscribeService, SubscribeRequest } from '../../services/subscribe.service';
import { LanguageService } from '../../services/language.service';
import { TranslationService } from '../../services/translation.service';
import { BaseTranslationComponent } from '../../shared/base-translation.component';
import { TranslationPipe } from '../../shared/translation.pipe';

@Component({
  selector: 'app-subscribe',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    FormsModule,
    CommonModule,
    TranslationPipe
  ],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})
export class SubscribeComponent extends BaseTranslationComponent {
  email = '';
  name = '';
  loading = false;
  success = false;
  error = '';

  constructor(
    private subscribeService: SubscribeService,
    languageService: LanguageService,
    translationService: TranslationService
  ) {
    super(languageService, translationService);
  }

  onSubmit() {
    if (!this.email) {
      this.error = this.getTranslation('subscribe.emailRequired');
      return;
    }

    this.loading = true;
    this.error = '';

    const subscribeData: SubscribeRequest = {
      email: this.email,
      name: this.name || undefined
    };

    this.subscribeService.subscribe(subscribeData).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.success = true;
          this.email = '';
          this.name = '';
        } else {
          this.error = response.message || this.getTranslation('subscribe.failed');
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Subscription error:', error);
        this.error = this.getTranslation('subscribe.error');
      }
    });
  }
}
