import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { SubscribeComponent } from '../../components/subscribe/subscribe.component';
import { NewsCardsComponent } from '../../components/news-cards/news-cards.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { HeaderComponent } from '../../components/header/header.component';
import { PostsService, Post } from '../../services/posts.service';

@Component({
  selector: 'app-home',
  imports: [
    FooterComponent,
    SubscribeComponent,
    NewsCardsComponent,
    HeroComponent,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  latestPosts: Post[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.loadLatestPosts();
  }

  private loadLatestPosts() {
    this.postsService.getLatestPosts(6).subscribe({
      next: (posts) => {
        this.latestPosts = posts;
      },
      error: (error) => {
        console.error('Error loading latest posts:', error);
        this.latestPosts = [];
      }
    });
  }
}
