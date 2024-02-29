import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/providers/session.service';
import { User } from 'src/app/shared/models/user.model';
import { UtilsService } from 'src/app/shared/providers/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  isLoading: boolean;
  isError: boolean = false;
  messageError: string = '';
  constructor(
    private router: Router,
    private sessionService: SessionService,
    private utils: UtilsService
  ) {
    this.isLoading = false;
  }

  ngOnInit() {
  }

  async onSubmit() {
    try {
      this.isError = false;
      this.isLoading = true;
      const data = await this.sessionService.signin(this.user);
      this.utils.toastSuccess('Vous êtes maintenant connecté');
      if (data.user.role == 'manager') {
        this.router.navigateByUrl('/user/listing');
      } else {
        this.router.navigateByUrl('/liste-rendez-vous/listing');
      }

      this.isLoading = false;
    } catch (e: any) {
      this.isError = true;
      this.utils.toastError('Login ou mot de passe incorrect');
      this.messageError = 'Login ou mot de passe incorrect';
      this.isLoading = false;
    }
  }
}
