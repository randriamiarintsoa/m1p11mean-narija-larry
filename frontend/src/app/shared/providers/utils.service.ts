import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {
    constructor(
        public dialog: MatDialog,
        private location: Location,
        private toastr: ToastrService,
    ) { }
    confirm(text?: string): Promise<boolean> {
        if (!text) {
            text = 'Voulez-vous vraiment continuer à réaliser cette action?';
        }
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '350px',
          data: text,
          hasBackdrop: true,
          disableClose: true, 
          closeOnNavigation: true,
        });
        return new Promise((resolve, reject) => {
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              resolve(true);
            } else {
              reject(false);
            }
          });
        });
    }
    back() {
        return this.location.back();
    }

    toastError =  (error?: string) =>  {
      if (!error) {
          error = 'Une erreur s\'est produite pendant le traitement';
      }
      this.toastr.error(error);
    }
    toastSuccess = (success?: string) => {
        if (!success) {
            success = 'Traitement réussi avec succès';
        }
        this.toastr.success(success, 'Succès');
    }
    toastWarning(warn: string) {
        this.toastr.warning(warn);
    }
    toastInfo(info: string) {
        this.toastr.info(info);
    }
}
