import { Component, OnInit, Inject } from '@angular/core';

import { Service } from 'src/app/shared/models/service.model';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

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
export class AddServiceModalsComponent implements OnInit{

  public liveDemoVisible = false;
  nom!: string;
  description!: string;
  delai!: string;
  service: Service = new Service();
  constructor(
    public dialogRef: MatDialogRef<AddServiceModalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
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

  toggleLiveDemo() {
    this.liveDemoVisible = !this.liveDemoVisible;
  }

  handleLiveDemoChange(event: boolean) {
    this.liveDemoVisible = event;
  }
  
 

  
}
