import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';
import { Service } from 'src/app/shared/models/service.model';
import { ListResult, ListPagination ,SearchInterface} from 'src/app/shared/models/list.interface';

import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/shared/providers/utils.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { AddServiceModalsComponent } from './add-service-modals/add-service-modals.component';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  dataSource!: any;
  user: User = new User();
  cle!: string;
  objectUser: any = {};
  searchData : SearchInterface = {
    q: '',
  };
  listing: ListPagination = {
    limit: 6,
    page: 1,
    total: 0,
    pageSizeOptions: [3, 6, 9, 12, 24]
  };
  isLoading: boolean;
  searchUpdated$: Subject<string | undefined> = new Subject<string | undefined>();
  service: Service = new Service();
  constructor(
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private utils: UtilsService,
    public dialog: MatDialog
    ) {
      this.isLoading = false;
      this.searchUpdated$.pipe(debounceTime(1000)).pipe(distinctUntilChanged())
      .subscribe((data) => {
        this.loadData();
      });
  }
  ngOnInit(){
    this.route.params.subscribe(async (p) => {
      this.user = new User();
    });
    this.loadData();
  }
  async loadData() {
    try {
        this.isLoading = true;
        const query: any =  {};
        query.sort = [{
          key : 'createdAt',
          ascendant: false
         }]
         if (this.searchData.q && this.searchData.q.length) {
          query.searchValue = this.searchData.q;
          query.searchFields = ['nom'];
        }
        const dataSource = await this.serviceService.list(this.listing.page, this.listing.limit, query);
        this.dataSource= dataSource.rows;
        this.listing.total = dataSource.total;
        this.isLoading = false;
    } catch (e) {
        console.error(e);
        this.isLoading = false;
    }    
  }
  async addnewservice() {
    const dialogConfig = new MatDialogConfig();

    // Définissez les dimensions de la fenêtre modale
    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(AddServiceModalsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async (result: {}) => {
      if (result) {
        const dat = await this.serviceService.add(this.service);
        if (dat) {
        // this.utils.toastSuccess();
          this.loadData();
        }
      }
    });
  }
  back() {
    this.utils.back();
  }
  async pushNotif(row) {
    const dialogConfig = new MatDialogConfig();
    
      // Définissez les dimensions de la fenêtre modale
      dialogConfig.width = '500px';
      dialogConfig.height = '400px';
    const dialogRef = this.dialog.open(AddServiceModalsComponent, {
    
      data: row.name,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(async (result: {}) => {
      if (result) {
        const dat = await this.serviceService.add(this.service);
        if (dat) {
          //this.utils.toastSuccess();
          this.loadData();
        }
      }
    });
  }

  onPageChange(event: PageEvent): void {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;

    this.listing.limit = pageSize;
    this.listing.page = pageIndex;
    
    this.loadData();
  }
}
