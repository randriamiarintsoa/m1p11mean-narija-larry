import { Route } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { EditComponent } from './edit/edit.component';
import { ProfilComponent } from './profil/profil.component';

export const routes: Route[] = [
    {
        path: '',
        redirectTo: 'profil',
        pathMatch: 'full',
    },
    { path: 'profil', component: ProfilComponent},
    { path: 'listing', component: ListingComponent},
    { path: 'edit/:id', component: EditComponent},
    { path: 'edit', component: EditComponent}
];
