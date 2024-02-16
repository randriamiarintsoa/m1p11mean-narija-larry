import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';
import { Service } from 'src/app/shared/models/service.model';
import { ListResult, ListPagination } from 'src/app/shared/models/list.interface';




@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  dataSource!: ListResult<Service>;
  service: Service = new Service();
  cle!: string;
  objectService: any = {};

  listing: ListPagination = {
      limit: 10,
      page: 1,
      total: 0,
      pageSizeOptions: [2, 5, 10, 25, 100]
  };
  isLoading: boolean;
 
  constructor(
    private serviceService: ServiceService,
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
            this.dataSource = await this.serviceService.list(this.listing.page, this.listing.limit, query);
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
            this.dataSource = await this.serviceService.list(this.listing.page, this.listing.limit,
              {
                searchValue: this.cle,
                searchFields: [
                  'nom', 'prix'
                ]});
            this.listing.total = this.dataSource.total;
            this.isLoading = false;
        } catch (e) {
            console.error(e);
            this.isLoading = false;
        }
    }
    
}

