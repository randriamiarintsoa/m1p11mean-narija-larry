import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { ListResult, ListPagination } from 'src/app/shared/models/list.interface';
import { SessionService } from 'src/app/shared/providers/session.service';

import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/shared/providers/utils.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id!: any;
  user!: User|any;
  userData: any;
  isLoading!: boolean;
  tokenData!: string;
  selectedRole: string[] = [];
  rolesArray = ['client', 'employer', 'manager'];
  rolesArrayInit = ['client', 'employer', 'manager'];

  constructor(
      private userService: UserService,
      private sessionService: SessionService,
      private utils: UtilsService,
      private route: ActivatedRoute,
      private router: Router,
  ) {}
  ngOnInit() {
    this.route.params.subscribe((p) => {
      this.id = p.id;
      if (this.id !== 'new') {
        this.loadData(this.id);
      } 
    });
  }

  async loadData(id) {
    try {
        this.isLoading = true;
        this.user = await this.userService.load(id);

        this.selectedRole = [this.user.role];
        let indexToRemove = this.rolesArray.indexOf(this.user.role);

        if (indexToRemove !== -1) {
          this.rolesArray.splice(indexToRemove, 1);
        }
        this.isLoading = false;
    } catch (e) {
        console.error(e);
        this.isLoading = false;
    }
  }
  back() {
    this.utils.back();
  }
  
  async drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
    } else {
      transferArrayItem(
        event.container.data,
        event.previousContainer.data,
        0,
        2
      );
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    const newRole = event.container.data[0];
    try {
      const p = await this.utils.confirm('Voulez vous modifier vraiment le rôle ?');
      if (p) {
        try {
          await this.userService.edit(this.id, {
            ...this.user,
            role: newRole
          });
          this.utils.toastSuccess();
          this.loadData(this.id);
        } catch (e) {
          this.utils.toastError();
        }
      } else {

        // Remettre en place par defaut les drag and drop
        this.selectedRole = [this.user.role];
        let indexToRemove = this.rolesArrayInit.indexOf(this.user.role);

        if (indexToRemove !== -1) {
          this.rolesArray = this.rolesArrayInit;
          this.rolesArray.splice(indexToRemove, 1);
        }
      }
    } catch (e) {
      this.utils.toastError();
    }
  }
}

