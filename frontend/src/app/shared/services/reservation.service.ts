import { Injectable } from '@angular/core';
import { Reservation } from '../models/resevation.model';
import { RestService } from '../providers/rest.service';
import { ListResult } from '../models/list.interface';
import { BehaviorSubject } from 'rxjs';
import { ListRequest } from '../models/list.interface';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private currentReservationInView: BehaviorSubject<Reservation|null> = new BehaviorSubject<Reservation|null>(null);
  peopleInViewUpdates$ = this.currentReservationInView.asObservable();
  constructor(
    private rest: RestService
  ) { }
  
  list(page: number, limit: number, query?: any): Promise<ListResult<Reservation>> {
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
     console.log('** options 2 ** ', options)
      const data = await this.rest.getAll('/reservations', options);
      console.log('** data 2** ', data)
       data.rows = data.rows?.map(i => new Reservation(i));
       resolve(data);
     } catch (e) {
       reject(e);
     }
   });
  }
  load(id: string): Promise<Reservation> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("Id service Reservation", id);
        const data = await this.rest.get('/reservation/' + id);
        console.log("data service", data);
        this.currentReservationInView.next(new Reservation(data));
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
  add(data: Reservation): Promise<Reservation> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('data Reservation :::', data)
        const result = await this.rest.post('/reservations', data);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
  edit(id: string, data: Reservation): Promise<Reservation> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.rest.put('/reservation/' + id, data);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
  search(id: string, data: Reservation): Promise<Reservation> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.rest.get('/reservations/' + id, data);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
  
}
