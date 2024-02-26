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
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
 // dataSource!: ListResult<User>;
 dataSource!: any;
 id!: any;
 rendezVous!: RendezVous;
 // user: User = new User();
  cle!: string;
  objectUser: any = {};

  listing: ListPagination = {
      limit: 10,
      page: 1,
      total: 0,
      pageSizeOptions: [2, 5, 10, 25, 100]
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
      this.route.params.subscribe(async (p) => {
        this.id = p.id;
        this.isLoading = true;
        this.userData = this.sessionService.userData;
       if (this.id !== 'new') {
          this.loadData(this.id);
        } else {
          this.rendezVous = new RendezVous();
        }
      });
    this.loadData(this.id);
    }
    async loadData(id) {
        try {
            this.isLoading = true;
            const query: any =  {};
            query.sort = [{
              key : 'createdAt',
              ascendant: false
             }];
             query.userId = this.userData.id;
            this.dataSource = await this.rendezVousService.list(this.listing.page, this.listing.limit, query);
            this.isLoading = false;
        } catch (e) {
            console.error(e);
            this.isLoading = false;
        }
    }
    
    back() {
      this.utils.back();
    }
}

