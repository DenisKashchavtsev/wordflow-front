import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Post {
  id: number;
  slug: string;
  title: string;
  content: string | { [key: string]: string };
  image: string;
  level: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  totalPages: number;
}

export interface PostsFilters {
  level?: string;
  category?: string;
  page?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Получить все посты с фильтрацией и пагинацией
  getPosts(filters: PostsFilters = {}): Observable<PostsResponse> {
    let params = new HttpParams();

    if (filters.level) {
      params = params.set('level', filters.level);
    }
    if (filters.category) {
      params = params.set('category', filters.category);
    }
    if (filters.page) {
      params = params.set('page', filters.page.toString());
    }

    return this.http.get<PostsResponse>(`${this.apiUrl}/posts`, { params });
  }

  // Получить пост по slug
  getPostBySlug(slug: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${slug}`);
  }

  // Получить пост по slug с контентом для определенного уровня
  getPostBySlugWithLevel(slug: string, level: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${slug}`, {
      params: { level: level }
    });
  }

  // Получить последние посты
  getLatestPosts(limit: number = 3): Observable<PostsResponse> {
    return this.http.get<PostsResponse>(`${this.apiUrl}/posts`, {
      params: { limit: limit.toString() }
    });
  }

  // Получить посты по категории
  getPostsByCategory(category: string, limit: number = 6): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts/category/${category}`, {
      params: { limit: limit.toString() }
    });
  }

  // Получить посты по уровню
  getPostsByLevel(level: string, limit: number = 6): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts/level/${level}`, {
      params: { limit: limit.toString() }
    });
  }

  // Получить все категории
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/posts/categories`);
  }

  // Получить все уровни
  getLevels(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/posts/levels`);
  }
}
