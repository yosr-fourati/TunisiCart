import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { Order } from '../../core/models';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container py-10">
      <h1 class="section-title mb-8">My Orders</h1>

      @if (loading()) {
        <div class="space-y-4">
          @for (i of [1,2,3]; track i) {
            <div class="card p-6 animate-pulse">
              <div class="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div class="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          }
        </div>
      } @else if (orders().length === 0) {
        <div class="text-center py-20">
          <div class="text-7xl mb-4">📋</div>
          <h2 class="text-xl font-semibold text-gray-700 mb-2">No orders yet</h2>
          <p class="text-gray-400 text-sm mb-8">Start shopping to see your order history here.</p>
          <a routerLink="/products" class="btn-primary">Shop Now</a>
        </div>
      } @else {
        <div class="space-y-4">
          @for (order of orders(); track order.id) {
            <div class="card p-6">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div class="flex items-center gap-3 mb-1">
                    <h3 class="font-semibold text-gray-900">Order #{{ order.id }}</h3>
                    <span [class]="getStatusClass(order.status)" class="badge">{{ order.status }}</span>
                  </div>
                  <p class="text-sm text-gray-500">{{ order.createdAt | date:'mediumDate' }}</p>
                </div>
                <div class="text-right">
                  <p class="text-xl font-bold text-gray-900">\${{ order.totalAmount | number:'1.2-2' }}</p>
                  @if (order.items?.length) {
                    <p class="text-xs text-gray-400">{{ order.items.length }} item{{ order.items.length > 1 ? 's' : '' }}</p>
                  }
                </div>
              </div>

              @if (order.items?.length) {
                <div class="mt-4 border-t border-gray-100 pt-4">
                  <div class="space-y-2">
                    @for (oi of order.items; track oi.item.id) {
                      <div class="flex justify-between text-sm">
                        <span class="text-gray-600">{{ oi.item.name }} × {{ oi.quantity }}</span>
                        <span class="text-gray-900 font-medium">\${{ (oi.unitPrice * oi.quantity) | number:'1.2-2' }}</span>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          }
        </div>
      }
    </div>
  `
})
export class OrderHistoryComponent implements OnInit {
  private orderService = inject(OrderService);
  private auth = inject(AuthService);

  orders = signal<Order[]>([]);
  loading = signal(true);

  ngOnInit() {
    const userId = this.auth.getUserId();
    if (!userId) { this.loading.set(false); return; }

    this.orderService.getOrderHistory(userId).subscribe({
      next: (o) => { this.orders.set(o); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      PENDING:   'badge-warning',
      CONFIRMED: 'badge-info',
      SHIPPED:   'badge-info',
      DELIVERED: 'badge-success',
      CANCELLED: 'badge-error',
    };
    return map[status] ?? 'badge badge-info';
  }
}
