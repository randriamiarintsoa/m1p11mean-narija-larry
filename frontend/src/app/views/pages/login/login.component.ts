import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/providers/session.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  isLoading: boolean;
  constructor(
    private router: Router,
    //private utils: UtilsService,
    private sessionService: SessionService
  ) {
    this.isLoading = false;
  }

  ngOnInit() {
  }

  async onSubmit() {
    try {
      console.log('auth')
      this.isLoading = true;
      const data = await this.sessionService.signin(this.user);
     // this.utils.toastSuccess('Vous êtes mainteant connecté.');
      this.router.navigateByUrl('/user/listing');
      this.isLoading = false;
    } catch (e) {
      console.error(e);
     // this.utils.toastError('Veuillez vérifier votre identifiants.');
      this.isLoading = false;
    }
  }
}
