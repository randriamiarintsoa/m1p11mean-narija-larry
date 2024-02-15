import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './user.routes';
import { ProfilComponent } from './profil/profil.component';
import { ListingComponent } from './listing/listing.component';
import { EditComponent } from './edit/edit.component';
//import { MatTableModule, MatIconModule, MatButtonModule, MatGridListModule, MatCardModule } from '@angular/material';
//import { MatFormFieldModule, MatPaginatorModule } from '@angular/material';
//import { MatInputModule } from '@angular/material';
import { UserService } from '../shared/services/user.service';
//import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
//import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    ProfilComponent,
    ListingComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
   /* MatGridListModule,
    MatTableModule,
   // MatFormFieldModule,
   // MatPaginatorModule,
    //MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,*/
    FormsModule,
   // NgSelectModule,
    //MatProgressSpinnerModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
