import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { ListResult, ListPagination ,SearchInterface} from 'src/app/shared/models/list.interface';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject, catchError, debounceTime, distinctUntilChanged } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { SessionService } from 'src/app/shared/providers/session.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ClientComponent implements OnInit {
 dataSource!: any;
 id!: any;
  user!: User;
 // user: User = new User();
  cle!: string;
  objectUser: any = {};
  searchData : SearchInterface = {
    q: '',
  };
  userData;

  listing: ListPagination = {
      limit: 10,
      page: 1,
      total: 0,
      pageSizeOptions: [2, 5, 10, 25, 100]
  };
  isLoading: boolean;
  searchUpdated$: Subject<string | undefined> = new Subject<string | undefined>();
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.isLoading = false;
    this.searchUpdated$.pipe(debounceTime(1000)).pipe(distinctUntilChanged())
    .subscribe((data) => {
      this.loadData(this.id);
    });
    }
    ngOnInit() {
      $(document).ready(function() {
        $('#sidebarCollapse').on('click', function() {
          $('#sidebarclient').addClass('active');
          $('.overlay').addClass('active');
          $('.collapse.in').toggleClass('in');
          $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });
      });
      this.userData = this.sessionService.userData;
    }

    async loadData(id) {
        try {
            this.isLoading = true;
            // const query: any =  {};
            // query.sort = [{
            //   key : 'createdAt',
            //   ascendant: false
            //  }]
            //  if (this.searchData.q && this.searchData.q.length) {
            //   query.searchValue = this.searchData.q;
            //   query.searchFields = ['nom'];
            // }
            // this.dataSource = await this.userService.list(this.listing.page, this.listing.limit, query);

            // this.user = await this.userService.load(id); 
            // console.log('user' ,this.user) 
            // this.listing.total = this.dataSource.total;
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
    async delete(row) {
      try {
       // const p = await this.utils.confirm('Voulez vous supprimer vraiment?');
       // if (p) {
            try {
              await this.userService.delete(row._id);
             // this.utils.toastSuccess();
              this.loadData(this.id);
            } catch (e) {
               // this.utils.toastError();
            }
      //  }
    } catch (e) {
    }
  }

  logout() {
    this.sessionService.signout(() => {
      window.location.reload();
      this.router.navigateByUrl('/client/home');
    });
  }
}

