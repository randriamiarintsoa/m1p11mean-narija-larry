import { Component, Input , OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { SessionService } from 'src/app/shared/providers/session.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  
  id!: any;
  user!: User;
  userData: any;
  isLoading!: boolean;

  constructor(
    private classToggler: ClassToggleService,
    private router: Router,
    private sessionService: SessionService,
    private userService: UserService,
     private route: ActivatedRoute,
   
  ) {
    super();
  }
  ngOnInit() {

    this.userData = this.sessionService.userData;
    this.isLoading = true;
    if (this.userData) {
      this.user = this.userData;
      console.log('u',  this.user)
    }  
    this.isLoading = false;  
    this.id = this.user.id;
    console.log('this.id',  this.id)
}
  
  logout() {
    this.sessionService.signout(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
