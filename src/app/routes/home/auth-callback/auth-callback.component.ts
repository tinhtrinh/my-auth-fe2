import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/auth/auth-service/auth.service.abstract';
import { Router } from '@angular/router';
import { from, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-auth-callback',
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss'
})
export class AuthCallbackComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private destroy$ = new Subject<void>;

  ngOnInit() {
    from(this.authService.tryLogin())
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        if (this.authService.hasValidAccessToken()) {
          console.log('Đăng nhập thành công!');
          this.router.navigate(['/home']); // hoặc bất kỳ route nào bạn muốn
        } else {
          console.error('Đăng nhập thất bại!');
          this.router.navigate(['/logout']); // hoặc hiển thị lỗi
        }
      },
      error: () => {
        console.error('Đăng nhập thất bại!');
        this.router.navigate(['/logout']);
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
