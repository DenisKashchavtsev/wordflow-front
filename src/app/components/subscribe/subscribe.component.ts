import { Component } from '@angular/core';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { SubscribeService, SubscribeRequest } from '../../services/subscribe.service';

@Component({
  selector: 'app-subscribe',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    FormsModule
  ],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})
export class SubscribeComponent {
  email = '';
  name = '';
  loading = false;
  success = false;
  error = '';

  constructor(private subscribeService: SubscribeService) {}

  onSubmit() {
    if (!this.email) {
      this.error = 'Please enter your email address';
      return;
    }

    this.loading = true;
    this.error = '';

    const subscribeData: SubscribeRequest = {
      email: this.email,
      name: this.name || undefined
    };

    this.subscribeService.subscribe(subscribeData).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.success = true;
          this.email = '';
          this.name = '';
        } else {
          this.error = response.message || 'Subscription failed. Please try again.';
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Subscription error:', error);
        this.error = 'Failed to subscribe. Please try again later.';
      }
    });
  }
}
