import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { ListResult, ListPagination } from 'src/app/shared/models/list.interface';
import { SessionService } from 'src/app/shared/providers/session.service';



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
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
  ) {}

  ngOnInit() {
      this.userData = this.sessionService.userData;
      console.log('datat',  this.userData );
      this.isLoading = true;
      if (this.userData) {
        this.user = this.userData;
      }  
      this.isLoading = false;  
      this.id = this.user.id;
  }
  
}

