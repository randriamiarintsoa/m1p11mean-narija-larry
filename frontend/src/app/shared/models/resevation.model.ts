import { BaseModel } from './base.model';
import { jsonIgnore } from 'json-ignore';

export class Reservation extends BaseModel {
  id: string;
  serviceId: string;
  reponsableId: string;
  statusId: string;
  date: string;
  heure: string;
  note:string;
}
