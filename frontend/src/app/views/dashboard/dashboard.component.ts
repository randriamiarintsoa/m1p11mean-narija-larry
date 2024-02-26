import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';

import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { ListResult, ListPagination } from 'src/app/shared/models/list.interface';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //dataSource!: ListResult<User>;
  dataSource!: any;
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

  constructor(
    private chartsData: DashboardChartsData,
    private userService: UserService,
    ) {
      this.isLoading = false;
  }

 
  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  ngOnInit(): void {
    this.initCharts();
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
        console.log('ETOOOOOOOOOO',typeof this.dataSource);
        console.log(this.dataSource[0]);
        this.listing.total = this.dataSource.total;
        this.isLoading = false;
        console.log(typeof this.dataSource)
    } catch (e) {
        console.error(e);
        this.isLoading = false;
    }
    
}
  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }
}
