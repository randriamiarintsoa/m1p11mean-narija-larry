
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';
import { Service } from 'src/app/shared/models/service.model';
import { UtilsService } from 'src/app/shared/providers/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { ListResult, ListPagination } from 'src/app/shared/models/list.interface'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddRdvModalsComponent } from './add-rdv-modals/add-rdv-modals.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  dataSource!: Service;
  isLoading!: boolean;
  id!: string;
  service: Service = new Service();
  users!: any;
  listing: ListPagination = {
    limit: 10,
    page: 1,
    total: 0,
    pageSizeOptions: [2, 5, 10, 25, 100]
};
  constructor(
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private utils: UtilsService,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async(p) => {
      this.id = p.id;
      this.isLoading = true;
      const liste = await this.userService.list(1, 200);
      this.users = liste.rows;
      console.log ('this.USERS', this.users );
      if (this.id !== 'new') {
        this.loadData(this.id);
      } else {
        this.service = new Service();
      }
    });
  }

  async loadData(id) {
    try {
        this.isLoading = true;
        this.service = await this.serviceService.load(id);
        console.log('dddd', this.service)
        this.users = await this.userService.list(this.listing.page, this.listing.limit, {role: 'employer' });
       console.log('this.users AAAA' ,this.users);
        this.isLoading = false;
    } catch (e) {
        console.error(e);
        this.isLoading = false;
    }
  }
  async onSubmit() {
    try {
      if (this.service.nom === '' ||
       this.service.description === '' ||
        this.service.delai === '' ||
        this.service.prix === null ) {
        return;
          }
      this.isLoading = true;
      let data;
      if (this.id !== 'new') {
        data = await this.serviceService.edit(this.id, this.service);
      } else {
        data = await this.serviceService.add(this.service);
      }
      if (data) {
        this.router.navigate(['/user']);
        this.isLoading = false;
      }
    } catch (e) {
      console.error(e);
      this.isLoading = false;
    }
  }
  back() {
    this.utils.back();
  }

  async addnewsrdv() {
    const dialogConfig = new MatDialogConfig();
  
    // Définissez les dimensions de la fenêtre modale
    dialogConfig.width = '500px';
    dialogConfig.height = '400px';
    dialogConfig.data = this.service;
  
    const dialogRef = this.dialog.open(AddRdvModalsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async (result: {}) => {
      if (result) {
        const dat = await this.serviceService.add(this.service);
        if (dat) {
         // this.utils.toastSuccess();
          // this.loadData();
        }
      }
    });
  }
}