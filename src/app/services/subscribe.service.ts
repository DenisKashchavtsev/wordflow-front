import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SubscribeRequest {
  email: string;
  name?: string;
  preferences?: string[];
}

export interface SubscribeResponse {
  success: boolean;
  message: string;
  subscriberId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Подписаться на новости
  subscribe(data: SubscribeRequest): Observable<SubscribeResponse> {
    return this.http.post<SubscribeResponse>(`${this.apiUrl}/subscribe`, data);
  }

  // Отписаться от новостей
  unsubscribe(email: string): Observable<SubscribeResponse> {
    return this.http.delete<SubscribeResponse>(`${this.apiUrl}/subscribe/${email}`);
  }

  // Проверить статус подписки
  checkSubscription(email: string): Observable<{ subscribed: boolean }> {
    return this.http.get<{ subscribed: boolean }>(`${this.apiUrl}/subscribe/check/${email}`);
  }

  // Обновить предпочтения подписки
  updatePreferences(email: string, preferences: string[]): Observable<SubscribeResponse> {
    return this.http.put<SubscribeResponse>(`${this.apiUrl}/subscribe/preferences/${email}`, {
      preferences
    });
  }
} 