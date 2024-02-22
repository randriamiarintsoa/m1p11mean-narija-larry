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

  selectedRole!: number;

  role = [
      { id: 1, name: 'client' },
      { id: 2, name: 'employer' },
      { id: 3, name: 'manager' },
     
  ];
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
      if (this.user.nom === '' || this.user.prenom === '' || this.user.email === '' ) {
      }else{
        let data;
      data = await this.userService.add(this.user);
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
