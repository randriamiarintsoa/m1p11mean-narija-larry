import { Component ,OnInit} from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async (p) => {
      this.user = new User();
    });
}

  

  async onSubmitregister() {
    try {
      if (this.user.lastname === '' || this.user.firstname === '' || this.user.email === '' ) {
      //  this.utils.toastError('Veuillez compléter le champ');
     // this.ToastRegisterUser();
      //  return;
      }else{
        let data;
      data = await this.userService.add(this.user);
      //console.log('data', data)
      if (data) {
        this.router.navigate(['/login']);
     //   this.isLoading = false;
      }
      }
      
    } catch (e) {
      console.error(e);
    //  this.isLoading = false;
    }
  }

}
