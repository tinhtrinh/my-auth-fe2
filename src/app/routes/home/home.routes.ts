import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from '../../shared/guard/auth-guard/auth.guard';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

export const homeRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'auth-callback',
        component: AuthCallbackComponent,
    },
];