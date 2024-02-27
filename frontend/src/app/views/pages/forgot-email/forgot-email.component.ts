import { Component ,OnInit} from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { SessionService } from 'src/app/shared/providers/session.service';
@Component({
  selector: 'app-forgot-email',
  templateUrl: './forgot-email.component.html',
  styleUrls: ['./forgot-email.component.scss']
})
export class ForgotEmailComponent implements OnInit {
  user: User = new User();
  isLoading!: boolean;
  isError: boolean = false;
  messageError: string = '';
  alertType: string = 'alert-success';
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async (p) => {
      this.user = new User();
    });
}

  

  async onSubmitregister() {
    try {
      this.isError = false;
      console.log('auth')
      this.isLoading = true;
      const data = await this.sessionService.forgotPassword(this.user);
      console.log('respone email ', data)
     // this.utils.toastSuccess('Vous êtes mainteant connecté.');
      // this.router.navigateByUrl('/user/listing');
      this.isError = true;
      this.alertType = 'alert-success';
      this.messageError = 'L\'email pour réinitialiser votre mot de passe a été envoyé avec succès.';
      this.isLoading = false;
    } catch (e: any) {
      console.error(e);

      this.isError = true;
      this.messageError = e?.error?.message
      this.alertType = 'alert-danger';

     // this.utils.toastError('Veuillez vérifier votre identifiants.');
      this.isLoading = false;
    }
    // 
    
  }

}
