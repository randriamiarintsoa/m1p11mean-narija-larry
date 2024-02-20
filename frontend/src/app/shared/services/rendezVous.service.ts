import { Injectable } from '@angular/core';
import { RendezVous } from '../models/rendezVous.model';
import { RestService } from '../providers/rest.service';
import { ListResult } from '../models/list.interface';
import { BehaviorSubject } from 'rxjs';
import { ListRequest } from '../models/list.interface';


@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private currentServiceInView: BehaviorSubject<RendezVous|null> = new BehaviorSubject<RendezVous|null>(null);
  peopleInViewUpdates$ = this.currentServiceInView.asObservable();
  constructor(
    private rest: RestService
  ) { }
  
  list(page: number, limit: number, query?: any): Promise<ListResult<RendezVous>> {
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
      const data = await this.rest.getAll('/rendezVous', options);
      console.log('** data 2** ', data)
       data.rows = data.rows?.map(i => new RendezVous(i));
       resolve(data);
     } catch (e) {
       reject(e);
     }
   });
  }
  load(id: string): Promise<RendezVous> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("Id rendezVous", id);
        const data = await this.rest.get('/rendezVous/' + id);
        console.log("data rendezVous", data);
        this.currentServiceInView.next(new RendezVous(data));
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  }
  delete(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.rest.delete('/rendezVous/' + id, {});
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  }
  add(data: RendezVous): Promise<RendezVous> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('data rendezVous :::', data)
        const result = await this.rest.post('/rendezVous', data);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
  edit(id: string, data: RendezVous): Promise<RendezVous> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.rest.put('/rendezVous/' + id, data);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
  search(id: string, data: RendezVous): Promise<RendezVous> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.rest.get('/rendezVous/' + id, data);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
}
