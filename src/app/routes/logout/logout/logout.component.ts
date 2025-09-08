import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../../shared/auth/auth-service/auth.service.abstract';

@Component({
  selector: 'app-logout',
  imports: [MatButton],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  private readonly authService = inject(AuthService);

  login(): void {
    this.authService.login();
  }
}
