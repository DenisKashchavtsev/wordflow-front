import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { PostDetailComponent } from '../../components/post-detail/post-detail.component';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { SubscribeComponent } from '../../components/subscribe/subscribe.component';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { PostsService, Post } from '../../services/posts.service';
import { LanguageService } from '../../services/language.service';
import { TranslationService } from '../../services/translation.service';
import { BaseTranslationComponent } from '../../shared/base-translation.component';
import { TranslationPipe } from '../../shared/translation.pipe';

@Component({
  selector: 'app-post',
  imports: [
    PostDetailComponent,
    PostCardComponent,
    SubscribeComponent,
    MatOption,
    MatFormField,
    MatSelect,
    MatLabel,
    MatButton,
    RouterLink,
    TranslationPipe
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent extends BaseTranslationComponent implements OnInit {
  post: Post | null = null;
  selectedLevel = 'B1_B2';
  levels = ['A1_A2', 'B1_B2', 'C1_C2'];
  latestNews: Post[] = [];
  postNotFound = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    languageService: LanguageService,
    translationService: TranslationService
  ) {
    super(languageService, translationService);
  }

  override ngOnInit() {
    super.ngOnInit();
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadPost(slug);
      this.loadLatestNews();
    } else {
      this.postNotFound = true;
    }

    // Подписываемся на изменения параметров URL
    this.route.queryParams.subscribe(params => {
      const level = params['level'];
      if (level && this.levels.includes(level)) {
        this.selectedLevel = level;
      }
    });
  }

  private loadPost(slug: string) {
    this.loading = true;
    this.postsService.getPostBySlug(slug).subscribe({
      next: (post) => {
        this.post = post;
        this.postNotFound = false;
        if (post?.level) {
          this.selectedLevel = post.level;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading post:', error);
        this.postNotFound = true;
        this.loading = false;
      }
    });
  }

  private loadLatestNews() {
    this.postsService.getLatestPosts(3).subscribe({
      next: (posts) => {
        this.latestNews = posts;
      },
      error: (error) => {
        console.error('Error loading latest news:', error);
        this.latestNews = [];
      }
    });
  }

  getContentByLevel(): string {
    if (!this.post?.content) return '';
    
    // Если API возвращает контент для разных уровней
    if (typeof this.post.content === 'object') {
      return this.post.content[this.selectedLevel] || this.post.content['B1_B2'] || '';
    }
    
    return this.post.content as string;
  }

  onLevelChange(level: string) {
    this.selectedLevel = level;
    
    // Обновляем URL с новым уровнем
    this.router.navigate([], {
      queryParams: { level: level },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });

    // Если есть пост, загружаем контент для нового уровня
    if (this.post) {
      const slug = this.route.snapshot.paramMap.get('slug');
      if (slug) {
        this.loading = true;
        this.postsService.getPostBySlugWithLevel(slug, level).subscribe({
          next: (updatedPost) => {
            this.post = updatedPost;
            this.loading = false;
          },
          error: (error) => {
            console.error('Error loading post content for level:', error);
            this.loading = false;
          }
        });
      }
    }
  }
}
