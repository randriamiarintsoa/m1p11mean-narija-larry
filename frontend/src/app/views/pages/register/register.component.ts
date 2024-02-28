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
  selectedRole!: User.RoleEnum;
  isError: boolean = false;
  messageError: string = '';
  repassword: string = '';
  isLoading: boolean = false;

  role = [
      { name: 'client' },
      { name: 'employer' },
      { name: 'manager' }
  ];
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async (p) => {
      this.user = new User();
    });
}
async onSubmitregister() {
    try {
      this.isError = false;
      this.isLoading = true;
      if (this.user.nom === '' || this.user.prenom === '' || this.user.email === ''
        || !this.selectedRole || this.user.telephone === '' 
        || this.user.password === '' || this.repassword === '' ) 
      {
        this.isError = true;
        this.messageError = "Merci de remplir tous les champs requis.";
        this.isLoading = false;
      } else if (this.repassword != this.user.password) {
        this.isError = true;
        this.messageError = "Les deux mots de passe ne sont pas identiques";
        this.isLoading = false;
      } else {
        this.user.role = this.selectedRole;
        let data = await this.userService.add(this.user);
        if (data) {
          this.router.navigate(['/login']);
          this.isLoading = false;
        }
      }
    } catch (e: any) {
      this.isError = true;
      this.messageError = e?.error?.message
      this.isLoading = false;
    }
  }
}
