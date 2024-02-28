import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './client.routes';
import { ClientComponent } from './listing/listing.component';
import { UserService } from '../shared/services/user.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { ServicesComponent } from './services/services.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DetailsComponent } from './details/details.component';
import { AddRdvModalsComponent } from './details/add-rdv-modals/add-rdv-modals.component';
import { PayerRdvModalsComponent } from './details/payer-rdv-modals/payer-rdv-modals.component';
import { provideNativeDateAdapter } from '@angular/material/core';




@NgModule({
  declarations: [
    ClientComponent,
    ServicesComponent,
    DetailsComponent,
    AddRdvModalsComponent,
    PayerRdvModalsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    MatFormFieldModule,
    MatDialogModule,

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
    MatDatepickerModule
  ],
  providers: [
    UserService,
    provideNativeDateAdapter()
  ],
})
export class ClientModule { }
