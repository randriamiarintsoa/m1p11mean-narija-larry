import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { ListResult, ListPagination } from 'src/app/shared/models/list.interface';
import { SessionService } from 'src/app/shared/providers/session.service';


import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/shared/providers/utils.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  id!: any;
  user!: User;
  userData: any;
  isLoading!: boolean;
  tokenData!: string;
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
ngOnInit() {
  this.route.params.subscribe((p) => {
    this.id = p.id;
    if (this.id !== 'new') {
      this.loadData(this.id);
    } else {
      this.user = new User();
    }
    this.userData = this.sessionService.userData;
    this.tokenData = this.sessionService.tokenData;
    console.log('this.userData :: ', this.userData)
    console.log('this.tokenData :: ', this.tokenData)
  });
}

async loadData(id) {
  try {
      this.isLoading = true;
      this.user = await this.userService.load(id);
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

