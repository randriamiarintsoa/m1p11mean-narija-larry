
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
//import { UtilsService } from 'src/app/shared/providers/utils.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  displayedColumns = ['name', 'email', 'price', 'action'];
  dataSource!: User;
  isLoading!: boolean;
  id!: string;
  user: User = new User();
  constructor(
    private userService: UserService,
   // private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p) => {
      this.id = p.id;
      if (this.id !== 'new') {
        this.loadData(this.id);
      } else {
        this.user = new User();
      }
    });
  }

  async loadData(id) {
    try {
        this.isLoading = true;
        this.user = await this.userService.load(id);
        this.isLoading = false;
    } catch (e) {
        console.error(e);
        this.isLoading = false;
    }
  }
  async onSubmit() {
    try {
      if (this.user.lastname === '' ||
       this.user.firstname === '' ||
        this.user.email === '' ||
        this.user.phone === null ) {
     //   this.utils.toastError('Veuillez compléter le champ');
        return;
          }
     /* if (!this.people.isValidEmail()) {
            this.utils.toastError('Veuillez verifer l\'email');
            return;
        }*/
   //   delete this.user._id;
     // delete this.user.password;
      this.isLoading = true;
      let data;
      if (this.id !== 'new') {
        data = await this.userService.edit(this.id, this.user);
      } else {
        data = await this.userService.add(this.user);
      }
     // this.utils.toastSuccess();
      if (data) {
        this.router.navigate(['/user']);
        this.isLoading = false;
      }
    } catch (e) {
      console.error(e);
      this.isLoading = false;
    }
  }
  back() {
  //  this.utils.back();
  }
}