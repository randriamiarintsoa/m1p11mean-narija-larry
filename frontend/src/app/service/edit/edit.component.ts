
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';
import { Service } from 'src/app/shared/models/service.model';
//import { UtilsService } from 'src/app/shared/providers/utils.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  dataSource!: Service;
  isLoading!: boolean;
  id!: string;
  service: Service = new Service();
  constructor(
    private serviceService: ServiceService,
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
        this.service = new Service();
      }
    });
  }

  async loadData(id) {
    try {
        this.isLoading = true;
        this.service = await this.serviceService.load(id);
        this.isLoading = false;
    } catch (e) {
        console.error(e);
        this.isLoading = false;
    }
  }
  async onSubmit() {
    try {
      if (this.service.nom === '' ||
       this.service.description === '' ||
        this.service.delai === '' ||
        this.service.prix === null ) {
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
        data = await this.serviceService.edit(this.id, this.service);
      } else {
        data = await this.serviceService.add(this.service);
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