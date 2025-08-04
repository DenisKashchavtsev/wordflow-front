import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-detail',
  imports: [],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent {
  @Input() post: any;
  @Input() content: string = '';
}
