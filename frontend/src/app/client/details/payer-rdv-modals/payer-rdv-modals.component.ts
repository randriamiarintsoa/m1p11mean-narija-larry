import { Component, OnInit, Inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Service } from '../../../shared/models/service.model';
import { User } from '../../../shared/models/user.model';
import { RendezVous } from '../../../shared/models/rendezVous.model';
import { ServiceService } from '../../../shared/services/service.service';
import { UserService } from '../../../shared/services/user.service';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ListPagination } from 'src/app/shared/models/list.interface';
import { SessionService } from 'src/app/shared/providers/session.service';
import { RendezVousService } from 'src/app/shared/services/rendezVous.service';


// userId:string;
//   notifictionId: String;  
//   note: String;  
//   date: String;  
//   heure: String; *

@Component({
  selector: 'app-payer-rdv-modals',
  templateUrl: './payer-rdv-modals.component.html',
  styleUrls: ['./payer-rdv-modals.component.scss']
})
export class PayerRdvModalsComponent implements OnInit {

  public liveDemoVisible = false;
  nom!: string;
  description!: string;
  delai!: string;
  isLoading: boolean = false;
  service: Service = new Service();
  user: User = new User();
  dataSource: any;
  selectedUser;
  listing: ListPagination = {
    limit: 10,
    page: 1,
    total: 0,
    pageSizeOptions: [2, 5, 10, 25, 100]
  };
  userData: any;
  serviceCurrent: any;
  rendezVous: RendezVous = new RendezVous();
  
  constructor(
    public dialogRef: MatDialogRef<PayerRdvModalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceService: ServiceService,
    private userService: UserService,
    private sessionService: SessionService,
    private rendezVousService: RendezVousService,
  ) {}

  ngOnInit() {
    this.loadData();
    this.rendezVous = this.data.rendezVous;
    this.userData = this.sessionService.user;
  }

  async loadData() {
    try {
        this.isLoading = true;
        const query: any =  {};
        query.sort = [{
          role : 'employer',
          ascendant: false
         }]
        this.dataSource = await this.userService.list(1, 500, {'role' : 'employer'});
        this.listing.total = this.dataSource.total;
        this.isLoading = false;
        console.log(this.dataSource)
    } catch (e) {
        console.error(e);
        this.isLoading = false;
    }    
  }

  public visible = true;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  async onSubmitSave() {
    try {
      this.isLoading = true;
      await this.rendezVousService.add(this.rendezVous);
      this.isLoading = false;
      this.dialogRef.close(this.rendezVous);
    } catch (e) {
      console.error(e);
      this.isLoading = false;
    }
  }
}
