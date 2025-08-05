import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { SubscribeComponent } from '../../components/subscribe/subscribe.component';
import { PostsService, Post, PostsResponse, PostsFilters } from '../../services/posts.service';
import { LanguageService } from '../../services/language.service';
import { TranslationService } from '../../services/translation.service';
import { BaseTranslationComponent } from '../../shared/base-translation.component';
import { TranslationPipe } from '../../shared/translation.pipe';

@Component({
  selector: 'app-posts-list',
  imports: [
    PostCardComponent,
    PaginationComponent,
    SubscribeComponent,
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    MatIcon,
    MatButton,
    TranslationPipe
  ],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent extends BaseTranslationComponent implements OnInit {
  posts: Post[] = [];
  page = 1;
  totalPages = 1;
  total = 0;
  loading = false;
  error = false;
  searchQuery = '';
  selectedCategory = '';
  selectedLevel = '';

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
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 1;
      this.searchQuery = params['search'] || '';
      this.selectedCategory = params['category'] || '';
      this.selectedLevel = params['level'] || '';
      this.loadPosts();
    });
  }

  onSearchChange(event: any) {
    const query = event.target.value;
    this.searchQuery = query;
    this.page = 1;
    this.updateUrl();
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.page = 1;
    this.updateUrl();
  }

  onLevelChange(level: string) {
    this.selectedLevel = level;
    this.page = 1;
    this.updateUrl();
  }

  onPageChange(page: number) {
    this.page = page;
    this.updateUrl();
  }

  private updateUrl() {
    const queryParams: any = {
      page: this.page
    };

    if (this.searchQuery) {
      queryParams.search = this.searchQuery;
    }
    if (this.selectedCategory) {
      queryParams.category = this.selectedCategory;
    }
    if (this.selectedLevel) {
      queryParams.level = this.selectedLevel;
    }

    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  loadPosts() {
    this.loading = true;
    this.error = false;
    
    const filters: PostsFilters = {
      page: this.page
    };

    if (this.selectedLevel) {
      filters.level = this.selectedLevel;
    }
    if (this.selectedCategory && this.selectedCategory !== 'All') {
      filters.category = this.selectedCategory;
    }

    this.postsService.getPosts(filters).subscribe({
      next: (response: PostsResponse) => {
        this.posts = response.posts || [];
        this.totalPages = response.totalPages || 1;
        this.total = response.total || 0;
        this.loading = false;
        this.error = false;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.posts = [];
        this.totalPages = 0;
        this.total = 0;
        this.loading = false;
        this.error = true;
      }
    });
  }
} 