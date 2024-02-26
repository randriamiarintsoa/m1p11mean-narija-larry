import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
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
        private location: Location
    ) { }
    confirm(text?: string): Promise<boolean> {
        if (!text) {
            text = 'Voulez-vous vraiment continuer à réaliser cette action?';
        }
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '350px',
          data: text
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
}
