import { Component, OnInit, ViewChild } from '@angular/core';

//import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
//import { UtilsService } from 'src/app/shared/providers/utils.service';
import { ListResult, ListPagination } from 'src/app/shared/models/list.interface';




@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  displayedColumns = ['name', 'email', 'phone', 'role', 'date', 'action'];
  dataSource!: ListResult<User>;
  user: User = new User();
  cle!: string;
  objectUser: any = {};

  listing: ListPagination = {
      limit: 10,
      page: 1,
      total: 0,
      pageSizeOptions: [2, 5, 10, 25, 100]
  };
  isLoading: boolean;
 /* @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageEvent: PageEvent;
*/
  constructor(
    private userService: UserService,
    //private utils: UtilsService
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
             }]
            this.dataSource = await this.userService.list(this.listing.page, this.listing.limit, query);
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
                  'firstname', 'lastname'
                ]});
            this.listing.total = this.dataSource.total;
            this.isLoading = false;
        } catch (e) {
            console.error(e);
            this.isLoading = false;
        }
    }
  /*  async delete(row) {
      try {
        const p = await this.utils.confirm('Voulez vous supprimer vraiment?');
        if (p) {
            try {
                await this.userService.delete(row._id);
                this.utils.toastSuccess();
                this.loadData();
            } catch (e) {
                this.utils.toastError();
            }
        }
    } catch (e) {
    }
    }*/
  /* changePage(pageEvent: PageEvent) {
        this.listing.limit = pageEvent.pageSize;
        this.listing.page = pageEvent.pageIndex + 1;
        this.loadData();
    }*/
 /*   async onSubmit() {
        try {
          if (
            this.user.lastname === '' ||
            this.user.firstname === '' ||
            this.user.email === '' ||
            this.user.phone === ''
          ) {
            this.utils.toastError('Veuillez compléter le champ');
            return;
          }
        } catch (e) {
          console.error(e);
          this.isLoading = false;
        }
      }
      */
}

