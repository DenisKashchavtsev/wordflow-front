import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateAndStripHtml'
})
export class TruncateAndStripHtmlPipe implements PipeTransform {
  transform(value: string, limit: number = 150, ellipsis: string = '…'): string {
    if (!value) return '';

    // Удаление HTML тегов
    const stripped = value.replace(/<[^>]+>/g, '');

    // Обрезка
    return stripped.length > limit ? stripped.slice(0, limit) + ellipsis : stripped;
  }
}
