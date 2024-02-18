import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './service.routes';
import { ListingComponent } from './listing/listing.component';
import { EditComponent } from './edit/edit.component';

import { UserService } from '../shared/services/user.service';

import { FormsModule } from '@angular/forms';
import { AddServiceModalsComponent } from './listing/add-service-modals/add-service-modals.component';



@NgModule({
  declarations: [
    ListingComponent,
    EditComponent,
    AddServiceModalsComponent,
  ],
 /* entryComponents: [
    AddServiceModalsComponent
  ],*/
  imports: [
    CommonModule,
    FormsModule,
    //MatDialogModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UserService
  ],
  

})
export class ServiceModule { }
