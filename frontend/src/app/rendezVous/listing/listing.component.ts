import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { ListResult, ListPagination } from 'src/app/shared/models/list.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/shared/services/service.service';
import { Service } from 'src/app/shared/models/service.model';
import { RendezVousService } from 'src/app/shared/services/rendezVous.service';
import { RendezVous } from 'src/app/shared/models/rendezVous.model';
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
  constructor(
    private userService: UserService,
    private rendezVousService: RendezVousService,
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
      this.isLoading = false;
    }
    ngOnInit() {
      this.route.params.subscribe(async (p) => {
        this.id = p.id;
        this.isLoading = true;
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
             }]
            this.dataSource = await this.rendezVousService.list(this.listing.page, this.listing.limit, query);
          
            console.log('dataSource RDV', this.dataSource);
          
            //   this.rendezVous = await this.rendezVousService.load(id); 
          //   console.log('user' ,this.rendezVous) 
          //   this.listing.total = this.dataSource.total;
          //   let userIds = [];
            
          //   for (const rendezVous of this.dataSource.rows) {
          //     userIds.push(rendezVous.userId);
          //  }
          //  userIds = Array.from(new Set(userIds));
          //   const userSource = await this.userService.list(1, 200, {ids: userIds});
          //   for (const user of userSource.rows) {
          //    this.objectUser[user._id] = user.nom;
          //  }
            this.isLoading = false;
        } catch (e) {
            console.error(e);
            this.isLoading = false;
        }
    }
    async search() {
          try {
            this.isLoading = true;
            this.dataSource = await this.rendezVousService.list(this.listing.page, this.listing.limit,
              {
                searchValue: this.cle,
                searchFields: [
                  'nom', 'penom'
                ]});
            this.listing.total = this.dataSource.total;
            this.isLoading = false;
        } catch (e) {
            console.error(e);
            this.isLoading = false;
        }
    }
  
}

