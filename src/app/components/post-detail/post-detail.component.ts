import { Component, Input } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { TranslationService } from '../../services/translation.service';
import { BaseTranslationComponent } from '../../shared/base-translation.component';
import { TranslationPipe } from '../../shared/translation.pipe';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-post-detail',
  imports: [TranslationPipe],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent extends BaseTranslationComponent {
  @Input() post: any;
  @Input() content: string = '';

  constructor(
    languageService: LanguageService,
    translationService: TranslationService
  ) {
    super(languageService, translationService);
  }

  protected readonly environment = environment;
}
