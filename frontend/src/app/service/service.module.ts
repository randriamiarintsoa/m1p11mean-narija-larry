import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './service.routes';
import { ListingComponent } from './listing/listing.component';
import { EditComponent } from './edit/edit.component';

import { UserService } from '../shared/services/user.service';

import { FormsModule } from '@angular/forms';
import { AddServiceModalsComponent } from './listing/add-service-modals/add-service-modals.component';
import { MatDialogModule } from '@angular/material/dialog';


import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    ListingComponent,
    EditComponent,
    AddServiceModalsComponent,
  ],
 
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    IconModule,
    MatFormFieldModule,

    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,

    RouterModule.forChild(routes)
  ],
  /*entryComponents: [
    AddServiceModalsComponent
  ],*/
  providers: [
    UserService
  ],
  

})
export class ServiceModule { }
