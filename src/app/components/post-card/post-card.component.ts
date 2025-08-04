import { Component, Input } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-post-card',
  imports: [
    MatCardActions,
    MatCardContent,
    MatCard,
    NgIf,
    RouterLink
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  @Input() post: any;
}
