import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/auth/auth-service/auth.service.abstract';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-callback',
  imports: [],
  templateUrl: './login-callback.component.html',
  styleUrl: './login-callback.component.scss'
})
export class LoginCallbackComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.authService.handleLoginCallback();

    if (this.authService.hasValidAccessToken()) {
      console.log('Đăng nhập thành công!');
      this.router.navigate(['/home']); // hoặc bất kỳ route nào bạn muốn
    } else {
      console.error('Đăng nhập thất bại!');
      this.router.navigate(['/logout']); // hoặc hiển thị lỗi
    }
  }
}
