import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-gray-900 text-gray-300 mt-16">
      <div class="page-container py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 11H4L5 9z"/>
                </svg>
              </div>
              <span class="text-lg font-bold text-white">Shop<span class="text-primary-400">Sphere</span></span>
            </div>
            <p class="text-sm text-gray-400 max-w-xs">
              A modern multi-seller e-commerce platform. Discover products from thousands of sellers worldwide.
            </p>
          </div>

          <div>
            <h4 class="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Shop</h4>
            <ul class="space-y-2 text-sm">
              <li><a routerLink="/products" class="hover:text-white transition-colors">All Products</a></li>
              <li><a routerLink="/auth/register" class="hover:text-white transition-colors">Become a Seller</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Account</h4>
            <ul class="space-y-2 text-sm">
              <li><a routerLink="/auth/login" class="hover:text-white transition-colors">Sign In</a></li>
              <li><a routerLink="/auth/register" class="hover:text-white transition-colors">Register</a></li>
              <li><a routerLink="/orders" class="hover:text-white transition-colors">My Orders</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2025 ShopSphere. Built by <span class="text-gray-400 font-medium">Yosr Fourati</span></p>
          <p class="mt-2 md:mt-0">Spring Boot 3 · Angular 17 · Stripe · JWT</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
