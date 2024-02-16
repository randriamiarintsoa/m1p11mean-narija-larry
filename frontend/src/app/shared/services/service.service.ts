import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';
import { RestService } from '../providers/rest.service';
import { ListResult } from '../models/list.interface';
import { BehaviorSubject } from 'rxjs';
import { ListRequest } from '../models/list.interface';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private currentServiceInView: BehaviorSubject<Service|null> = new BehaviorSubject<Service|null>(null);
  peopleInViewUpdates$ = this.currentServiceInView.asObservable();
  constructor(
    private rest: RestService
  ) { }
  
  list(page: number, limit: number, query?: any): Promise<ListResult<Service>> {
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
      const data = await this.rest.getAll('/services', options);
      console.log('** data 2** ', data)
       data.rows = data.rows?.map(i => new Service(i));
       resolve(data);
     } catch (e) {
       reject(e);
     }
   });
  }
  load(id: string): Promise<Service> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("Id service Service", id);
        const data = await this.rest.get('/service/' + id);
        console.log("data service", data);
        this.currentServiceInView.next(new Service(data));
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  }
  delete(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.rest.delete('/service/' + id, {});
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  }
  add(data: Service): Promise<Service> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('data Service :::', data)
        const result = await this.rest.post('/service', data);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
  edit(id: string, data: Service): Promise<Service> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.rest.put('/service/' + id, data);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
  search(id: string, data: Service): Promise<Service> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.rest.get('/users/' + id, data);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
}
