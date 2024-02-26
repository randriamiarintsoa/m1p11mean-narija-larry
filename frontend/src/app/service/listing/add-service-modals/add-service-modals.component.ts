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

export interface DialogData {
  animal: string;
  name: string;
}
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
  constructor(
    public dialogRef: MatDialogRef<AddServiceModalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
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
  onSubmiPushNotification() {
    if (!this.nom) {
      return;
    }
    this.dialogRef.close({title: this.nom, message: this.description});
  }
  
}
