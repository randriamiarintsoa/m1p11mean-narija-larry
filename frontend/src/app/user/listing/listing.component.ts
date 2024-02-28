import { Component, OnInit, ViewChild , AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { ListResult, ListPagination ,SearchInterface} from 'src/app/shared/models/list.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { UtilsService } from 'src/app/shared/providers/utils.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
 dataSource!: any;
 id!: any;
  user!: User;
 // user: User = new User();
  cle!: string;
  objectUser: any = {};
  searchData : SearchInterface = {
    q: '',
  };

  listing: ListPagination = {
      limit: 10,
      page: 1,
      total: 0,
      pageSizeOptions: [5, 10, 25, 50, 100]
  };
  isLoading: boolean;
  searchUpdated$: Subject<string | undefined> = new Subject<string | undefined>();
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private utils: UtilsService
  ) {
    this.isLoading = false;
    this.searchUpdated$.pipe(debounceTime(1000)).pipe(distinctUntilChanged())
    .subscribe((data) => {
      this.loadData();
    });
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
             }]
             if (this.searchData.q && this.searchData.q.length) {
              query.searchValue = this.searchData.q;
              query.searchFields = ['nom'];
            }
            let dataSource = await this.userService.list(this.listing.page, this.listing.limit, query);
            this.dataSource = dataSource.rows; 
            this.listing.total = dataSource.total;
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
    back() {
      this.utils.back();
    }
    async delete(row) {
      try {
      const p = await this.utils.confirm('Voulez vous supprimer vraiment?');
      if (p) {
        try {
          await this.userService.delete(row._id);
          // this.utils.toastSuccess();
          this.loadData();
        } catch (e) {
            // this.utils.toastError();
        }
      }
    } catch (e) {
    }
  }

  onPageChange(event: PageEvent): void {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;

    this.listing.limit = pageSize;
    this.listing.page = pageIndex;
    
    this.loadData();
  }
}

