import { Component, OnInit, Inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Service } from '../../../../app/shared/models/service.model';
import { User } from '../../../../app/shared/models/user.model';
import { RendezVous } from '../../../../app/shared/models/rendezVous.model';
import { ServiceService } from '../../../../app/shared/services/service.service';
import { UserService } from '../../../../app/shared/services/user.service';

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
import { UtilsService } from 'src/app/shared/providers/utils.service';


// userId:string;
//   notifictionId: String;  
//   note: String;  
//   date: String;  
//   heure: String; *

@Component({
  selector: 'app-add-rdv-modals',
  templateUrl: './add-rdv-modals.component.html',
  styleUrls: ['./add-rdv-modals.component.scss']
})
export class AddRdvModalsComponent implements OnInit {

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

  rendezVous: RendezVous = new RendezVous();
  
  constructor(
    public dialogRef: MatDialogRef<AddRdvModalsComponent>,
    @Inject(MAT_DIALOG_DATA) public serviceCurrent: Service,
    private serviceService: ServiceService,
    private userService: UserService,
    private sessionService: SessionService,
    private rendezVousService: RendezVousService,
    private utils: UtilsService,
  ) {}

  ngOnInit() {
    this.loadData();
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
    console.log('=================', this.rendezVous);
    if (!this.rendezVous.date || !this.selectedUser || !this.rendezVous.heure) {
      return this.utils.toastError('Veuillez compléter tous les champs')
    }
    this.rendezVous.employer = this.selectedUser;
    this.rendezVous.client = this.userData ? this.userData.id  : null;
    this.rendezVous.service = this.serviceCurrent._id;
    this.rendezVous.tarifs = this.serviceCurrent.prix;
    this.rendezVous.payement = 'OK';
    this.rendezVous.status = 'inprogress';
    this.rendezVous.notifictionId = '12345678';

    try {
      // await this.rendezVousService.add(this.rendezVous);
      this.dialogRef.close(this.rendezVous);
    } catch (e) {
      console.log(e);
      this.isLoading = false;
    }
  }
}
