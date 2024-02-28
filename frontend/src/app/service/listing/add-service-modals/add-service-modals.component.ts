import { Component, OnInit, Inject } from '@angular/core';

import { Service } from 'src/app/shared/models/service.model';
import {MatButtonModule} from '@angular/material/button';


import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ServiceService } from 'src/app/shared/services/service.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface DialogData {
  nom: string;
  description: string;
  delai: string;
  prix: string;
}



@Component({
  selector: 'app-add-service-modals',
  templateUrl: './add-service-modals.component.html',
  styleUrls: ['./add-service-modals.component.scss']
})
export class AddServiceModalsComponent implements OnInit {

  public liveDemoVisible = false;
  nom!: string;
  description!: string;
  delai!: string;
  service: Service = new Service();
  isLoading!: boolean;
  id!:string;
  constructor(
    public dialogRef: MatDialogRef<AddServiceModalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private serviceService: ServiceService,
    private router: Router,
  ) {}

  ngOnInit() {
  }



  public visible = true;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  async addservice() {
    try {
      if (this.service.nom === '' ||
       this.service.description === '' ||
        this.service.delai === '' ||
        this.service.prix === null ) {
        return;
          }
      this.isLoading = true;
      let data;
      // if (this.id !== 'new') {
      //   data = await this.serviceService.edit(this.id, this.service);
      // } else {
        data = await this.serviceService.add(this.service);
      // }
      if (data) {
        this.router.navigate(['/service/listing']);
        this.isLoading = false;
      }
    } catch (e) {
      console.error(e);
      this.isLoading = false;
    }
  }
  
}
