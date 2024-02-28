import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { ListResult, ListPagination } from 'src/app/shared/models/list.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/shared/services/service.service';
import { Service } from 'src/app/shared/models/service.model';
import { RendezVousService } from 'src/app/shared/services/rendezVous.service';
import { RendezVous } from 'src/app/shared/models/rendezVous.model';
import { SessionService } from 'src/app/shared/providers/session.service';
import { UtilsService } from 'src/app/shared/providers/utils.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  dataSource!: any;
  id!: any;
  rendezVous!: RendezVous;
  cle!: string;
  objectUser: any = {};

  listing: ListPagination = {
      limit: 10,
      page: 1,
      total: 0,
      pageSizeOptions: [5, 10, 25, 50, 100]
  };
  isLoading: boolean;
  userData;
  constructor(
    private userService: UserService,
    private rendezVousService: RendezVousService,
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private utils:UtilsService
  ) {
      this.isLoading = false;
    }
    ngOnInit() {
      this.loadData();
    }
    async loadData() {
      try {
        this.isLoading = true;
        const query: any =  {};
        query.sort = [{
          key : 'createdAt',
          ascendant: false
          }];
        this.userData = this.sessionService.userData;
        query.userId = this.userData.id;
        let dataSource = await this.rendezVousService.list(this.listing.page, this.listing.limit, query);
        this.dataSource= dataSource.rows;
        this.listing.total = dataSource.total;
        this.isLoading = false;
      } catch (e) {
        console.error(e);
        this.isLoading = false;
      }
    }
    
    back() {
      this.utils.back();
    }

    onPageChange(event: PageEvent): void {
      const pageIndex = event.pageIndex + 1;
      const pageSize = event.pageSize;
  
      this.listing.limit = pageSize;
      this.listing.page = pageIndex;
      
      this.loadData();
    }
}

