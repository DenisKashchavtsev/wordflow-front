import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationPipe } from './translation.pipe';
import { TranslationDirective } from './translation.directive';

@NgModule({
  imports: [
    CommonModule,
    TranslationPipe,
    TranslationDirective
  ],
  exports: [
    TranslationPipe,
    TranslationDirective
  ]
})
export class TranslationModule { } 