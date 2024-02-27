import { Component ,OnInit} from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  user: User = new User();
  repassword: string = '';
  isError: boolean = false;
  isLoading: boolean = false;
  messageError: string = '';
  tokenReset!: string;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const tokenReset = this.route.snapshot.paramMap.get('tokenReset');
    if (tokenReset) {
      this.tokenReset = tokenReset;
      console.log('tokenReset ::', this.tokenReset)
    }
}

  

  async onSubmit() {
    try {
      this.isError = false;
      this.isLoading = true;
      if (this.user.password === '' || this.repassword === '' || 
        this.user.password != this.repassword
      ) {
      //  this.utils.toastError('Veuillez compléter le champ');
     // this.ToastRegisterUser();
        this.isError = true;
        this.isLoading = false;
        this.messageError = 'Veuillez verifier les champ';
        return;
      } else {
        let data;
        data = await this.userService.editPassword(this.repassword, this.tokenReset);
        console.log('data', data)
      if (data) {
        this.router.navigate(['/login']);
        this.isLoading = false;
      }
      }
      
    } catch (e) {
      console.error(e);
      this.isLoading = false;
    }
  }

}
