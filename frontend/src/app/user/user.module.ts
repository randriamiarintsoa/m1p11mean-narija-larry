import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './user.routes';
import { ProfilComponent } from './profil/profil.component';
import { ListingComponent } from './listing/listing.component';
import { EditComponent } from './edit/edit.component';
import { UserService } from '../shared/services/user.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';

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
  TabsModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';




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
    MatFormFieldModule,
    MatPaginatorModule,
    CdkDropListGroup, CdkDropList, CdkDrag
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
