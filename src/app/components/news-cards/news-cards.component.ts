import { Component, Input } from '@angular/core';
import { PostCardComponent } from '../post-card/post-card.component';
import { NgForOf } from '@angular/common';
import { Post } from '../../services/posts.service';

@Component({
  selector: 'app-news-cards',
  imports: [
    PostCardComponent,
  ],
  templateUrl: './news-cards.component.html',
  styleUrl: './news-cards.component.css'
})
export class NewsCardsComponent {
  @Input() posts: Post[] = [];

  // Если нет постов, показываем пустой массив
  get displayPosts() {
    return this.posts || [];
  }
}
