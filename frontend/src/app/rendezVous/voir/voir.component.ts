import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { ListResult, ListPagination } from 'src/app/shared/models/list.interface';
import { SessionService } from 'src/app/shared/providers/session.service';


import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/shared/providers/utils.service';
import { ServiceService } from 'src/app/shared/services/service.service';
import { Service } from 'src/app/shared/models/service.model';
import { RendezVousService } from 'src/app/shared/services/rendezVous.service';
import { RendezVous } from 'src/app/shared/models/rendezVous.model';
@Component({
  selector: 'app-voir',
  templateUrl: './voir.component.html',
  styleUrls: ['./voir.component.scss']
})
export class VoirComponent implements OnInit {
  id!: any;
  rendezVous!: RendezVous;
  userData: any;
  isLoading!: boolean;
  tokenData!: string;
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private rendezVousService: RendezVousService
  ) {}
ngOnInit() {
  this.route.params.subscribe((p) => {
    this.id = p.id;
    if (this.id !== 'new') {
      this.loadData(this.id);
    } else {
      this.rendezVous = new RendezVous();
    }
    this.userData = this.sessionService.userData;
    this.tokenData = this.sessionService.tokenData;
  });
}

async loadData(id) {
  try {
      this.isLoading = true;
      this.rendezVous = await this.rendezVousService.load(id);
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

