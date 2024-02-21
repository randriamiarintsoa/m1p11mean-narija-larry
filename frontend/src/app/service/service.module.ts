import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './service.routes';
import { ListingComponent } from './listing/listing.component';
import { EditComponent } from './edit/edit.component';

import { UserService } from '../shared/services/user.service';

import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';


import { ButtonModule, CardModule, FormModule, GridModule ,AvatarModule,ButtonGroupModule,NavModule,ProgressModule,TableModule,TabsModule, ModalModule} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { MatDialog } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { AddServiceModalsComponent } from './listing/add-service-modals/add-service-modals.component';
import {AddRdvModalsComponent} from './details/add-rdv-modals/add-rdv-modals.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DetailsComponent } from './details/details.component';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    ListingComponent,
    EditComponent,
    DetailsComponent,
    AddServiceModalsComponent,
    AddRdvModalsComponent,
  ],
 
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    ButtonModule,
    CardModule,
    FormModule,
    NgxMaterialTimepickerModule,
    GridModule,
    IconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    AvatarModule,
    ButtonGroupModule,
    NavModule,
    MatInputModule,
    MatButtonModule,
    NgSelectModule,
    ProgressModule,
    TableModule,
    TabsModule,
    ReactiveFormsModule,
    // MatDialog,
    NgSelectModule,
    ModalModule,
    MatDatepickerModule,
    RouterModule.forChild(routes)
  ],
  
  providers: [
    UserService,
    provideNativeDateAdapter()
  ],
  bootstrap: [
    ListingComponent,
    AddServiceModalsComponent,
    AddRdvModalsComponent
  ],
  // entryComponents: [
  //   AddServiceModalsComponent,
  // ],

})
export class ServiceModule { }
