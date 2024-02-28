import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';
import { Service } from 'src/app/shared/models/service.model';
import { ListResult, ListPagination ,SearchInterface} from 'src/app/shared/models/list.interface';

import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/shared/providers/utils.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
//import { AddServiceModalsComponent } from './add-service-modals/add-service-modals.component';
import { Subject, catchError, debounceTime, distinctUntilChanged } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { SessionService } from 'src/app/shared/providers/session.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
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
  userData;
  constructor(
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private utils: UtilsService,
    public dialog: MatDialog,
    private renderer: Renderer2,
    private http: HttpClient,
    private sessionService: SessionService,
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
    $(document).ready(function() {
      $('#sidebarCollapse').on('click', function() {
        $('#sidebarclient').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      });
    });
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
        console.log(typeof this.dataSource)
        this.userData = this.sessionService.userData;
    } catch (e) {
        console.error(e);
        this.isLoading = false;
    }    
  }

  logout() {
    this.sessionService.signout(() => {
      this.router.navigateByUrl('/client/services');
    });
  }
  onPageChange(event: PageEvent): void {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;

    this.listing.limit = pageSize;
    this.listing.page = pageIndex;
    
    this.loadData();
  }

/*
async addnewservice() {
  const dialogConfig = new MatDialogConfig();

  // Définissez les dimensions de la fenêtre modale
  dialogConfig.width = '500px';
  dialogConfig.height = '300px';
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
}*/
back() {
  this.utils.back();
}
/*async pushNotif(row) {
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
}*/
}
