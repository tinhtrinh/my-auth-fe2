import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from '../../shared/guard/auth-guard/auth.guard';
import { LoginCallbackComponent } from './login-callback/login-callback.component';

export const homeRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login-callback',
        component: LoginCallbackComponent,
    },
];