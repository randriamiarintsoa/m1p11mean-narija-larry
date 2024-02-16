import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { RestService } from '../providers/rest.service';
import { ListResult } from '../models/list.interface';
import { BehaviorSubject } from 'rxjs';
import { ListRequest } from '../models/list.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserInView: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
  peopleInViewUpdates$ = this.currentUserInView.asObservable();
  constructor(
    private rest: RestService
  ) { }
  
  list(page: number, limit: number, query?: any): Promise<ListResult<User>> {
    return new Promise(async (resolve, reject) => {
    try {
       console.log('**** 2 ', page)
      console.log('**** 2', limit)

       const options: ListRequest = {
         page,
         limit,
       };
       if (query) {
         for (const key in query) {
           if (query[key]) {
             options[key] = query[key];
           }
         }
       }
      // const data = await this.rest.post('/conges', options);
     console.log('** options 2 ** ', options)
      const data = await this.rest.getAll('/users', options);
      console.log('** data 2** ', data)
       data.rows = data.rows?.map(i => new User(i));
       resolve(data);
     } catch (e) {
       reject(e);
     }
   });
  }
  load(id: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("Id service user", id);
        const data = await this.rest.get('/users/' + id);
        console.log("data service", data);
        this.currentUserInView.next(new User(data));
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  }
  delete(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.rest.delete('/user/' + id, {});
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  }
  add(data: User): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('data user :::', data)
        const result = await this.rest.post('/users', data);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
  edit(id: string, data: User): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.rest.put('/users/' + id, data);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
  search(id: string, data: User): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.rest.get('/users/' + id, data);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
  count(): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.rest.get('/misc/dashboard');
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
}
