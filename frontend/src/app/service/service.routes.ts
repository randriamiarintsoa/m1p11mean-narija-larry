import { Route } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';

export const routes: Route[] = [
    {
        path: '',
        redirectTo: 'listing',
        pathMatch: 'full',
    },
    { path: 'listing', component: ListingComponent},
    { path: 'edit/:id', component: EditComponent},
    { path: 'edit', component: EditComponent},
    { path: 'details/:id', component: DetailsComponent}
];
