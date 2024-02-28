import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './rendezVous.routes';
import { ProfilComponent } from './profil/profil.component';
import { ListingComponent } from './listing/listing.component';
import { EditComponent } from './edit/edit.component';
import { RendezVousService } from '../shared/services/rendezVous.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { MatPaginatorModule } from '@angular/material/paginator';




@NgModule({
  declarations: [
    ProfilComponent,
    ListingComponent,
    EditComponent,
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
    MatPaginatorModule
  ],
  providers: [
    RendezVousService
  ]
})
export class RendezVousModule { }
