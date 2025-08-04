import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { PostsListComponent } from './pages/posts-list/posts-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostsListComponent },
  { path: 'blog/:slug', component: PostComponent },
];
