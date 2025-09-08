import { Routes } from '@angular/router';
import { logoutRoutes } from './routes/logout/logout.routes';
import { homeRoutes } from './routes/home/home.routes';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    ...homeRoutes,
    ...logoutRoutes
];
