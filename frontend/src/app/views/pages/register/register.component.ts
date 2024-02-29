import { Component ,OnInit} from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { UtilsService } from 'src/app/shared/providers/utils.service';
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
    private utils: UtilsService
  ) { 
    
  }

  ngOnInit() {
    this.route.params.subscribe(async (p) => {
      this.user = new User();
    });
}

isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
isValidPhoneNumber(telephone: string): boolean {
  
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(telephone);
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
        this.utils.toastError('Merci de remplir tous les champs requis.');
        this.messageError = "Merci de remplir tous les champs requis.";
        this.isLoading = false;
      } else if (this.repassword != this.user.password) {
        this.isError = true;
        this.utils.toastError('Les deux mots de passe ne sont pas identiques');
        this.messageError = "Les deux mots de passe ne sont pas identiques";
        this.isLoading = false;
      } else if (!this.isValidEmail(this.user.email)){
        this.isError = true;
        this.utils.toastError('Email invalide');
        this.messageError = "Email invalide";
        this.isLoading = false;
      }else if (!this.isValidPhoneNumber(this.user.telephone)){
        this.isError = true;
        this.utils.toastError('Téléphone invalide');
        this.messageError = "Téléphone invalide";
        this.isLoading = false;
      } 
      else {
        this.user.role = this.selectedRole;
        let data = await this.userService.add(this.user);
        if (data) {
          this.utils.toastSuccess('Inscription terminée avec succès."');
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
