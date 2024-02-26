import { Route } from '@angular/router';
import { ClientComponent } from './listing/listing.component';
import { ServicesComponent } from './services/services.component';
import { DetailsComponent } from './details/details.component';
export const routes: Route[] = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    { path: 'home', component: ClientComponent},
    { path: 'services', component: ServicesComponent},
    { path: 'service/details/:id', component: DetailsComponent}
];
