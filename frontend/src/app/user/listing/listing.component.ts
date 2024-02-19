import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { ListResult, ListPagination } from 'src/app/shared/models/list.interface';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
 // dataSource!: ListResult<User>;
 dataSource!: any;
 id!: any;
  user!: User;
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
          this.user = new User();
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
            this.dataSource = await this.userService.list(this.listing.page, this.listing.limit, query);
            this.user = await this.userService.load(id); 
            console.log('user' ,this.user) 
            this.listing.total = this.dataSource.total;
            this.isLoading = false;
        } catch (e) {
            console.error(e);
            this.isLoading = false;
        }
    }
    async search() {
          try {
            this.isLoading = true;
            this.dataSource = await this.userService.list(this.listing.page, this.listing.limit,
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

