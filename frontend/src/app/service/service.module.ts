import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './service.routes';
import { ListingComponent } from './listing/listing.component';
import { EditComponent } from './edit/edit.component';

import { UserService } from '../shared/services/user.service';

import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    
    ListingComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UserService
  ]
})
export class ServiceModule { }
