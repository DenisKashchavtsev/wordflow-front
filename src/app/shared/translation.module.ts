import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationPipe } from './translation.pipe';
import { TranslationDirective } from './translation.directive';
import {TruncateAndStripHtmlPipe} from './truncate-and-strip-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    TranslationPipe,
    TranslationDirective,
    TruncateAndStripHtmlPipe
  ],
  exports: [
    TranslationPipe,
    TranslationDirective,
    TruncateAndStripHtmlPipe
  ]
})
export class TranslationModule { }
