import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-activate',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 bg-gray-50">
      <div class="card p-10 text-center max-w-md w-full">
        @if (loading()) {
          <div class="text-5xl mb-4 animate-spin inline-block">⚙️</div>
          <h2 class="text-xl font-bold text-gray-900">Activating your account...</h2>
        } @else if (success()) {
          <div class="text-5xl mb-4">🎉</div>
          <h2 class="text-xl font-bold text-gray-900 mb-2">Account Activated!</h2>
          <p class="text-gray-500 text-sm mb-6">Your account is ready. Sign in to start shopping.</p>
          <a routerLink="/auth/login" class="btn-primary">Sign In Now</a>
        } @else {
          <div class="text-5xl mb-4">❌</div>
          <h2 class="text-xl font-bold text-gray-900 mb-2">Activation Failed</h2>
          <p class="text-gray-500 text-sm mb-6">The link may be expired or invalid. Try registering again.</p>
          <a routerLink="/auth/register" class="btn-primary">Register Again</a>
        }
      </div>
    </div>
  `
})
export class ActivateComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  loading = signal(true);
  success = signal(false);

  ngOnInit() {
    const token = this.route.snapshot.queryParams['token'];
    if (!token) {
      this.loading.set(false);
      return;
    }
    this.http.get(`${environment.apiUrl}/auth/activate-account?token=${token}`).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
      },
      error: () => {
        this.loading.set(false);
        this.success.set(false);
      }
    });
  }
}
