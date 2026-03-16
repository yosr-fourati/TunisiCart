import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cart, CartItemRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private base = environment.apiUrl;
  cart = signal<Cart | null>(null);
  cartCount = computed(() => this.cart()?.cartItems?.length ?? 0);

  constructor(private http: HttpClient) {}

  loadCart(userId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.base}/user/cart/${userId}`).pipe(
      tap(cart => this.cart.set(cart))
    );
  }

  addToCart(userId: number, request: CartItemRequest): Observable<any> {
    return this.http.post(`${this.base}/user/cart/items/${userId}`, request).pipe(
      tap(() => this.loadCart(userId).subscribe())
    );
  }

  updateCartItem(cartItemId: number, request: CartItemRequest, userId: number): Observable<any> {
    return this.http.put(`${this.base}/user/cart/items/${cartItemId}`, request).pipe(
      tap(() => this.loadCart(userId).subscribe())
    );
  }

  removeCartItem(cartItemId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.base}/user/cart/items/${cartItemId}`).pipe(
      tap(() => this.loadCart(userId).subscribe())
    );
  }

  clearCart(userId: number): Observable<any> {
    return this.http.delete(`${this.base}/user/cart/${userId}`).pipe(
      tap(() => this.cart.set(null))
    );
  }

  getTotal(): number {
    return this.cart()?.cartItems?.reduce(
      (sum, ci) => sum + ci.item.price * ci.quantity, 0
    ) ?? 0;
  }
}
